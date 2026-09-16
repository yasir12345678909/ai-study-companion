from app.core.config import settings


class RAGService:
    def __init__(self):
        self.collection = None
        self.documents = []

    def _ensure(self):
        if self.collection is not None:
            return
        try:
            import chromadb
            self.collection = chromadb.PersistentClient(path=settings.chroma_dir).get_or_create_collection("studypilot_materials")
        except Exception:
            self.collection = None

    @staticmethod
    def build_where(subject_id, include_class_materials=False, enrolled_class_ids=None):
        base = {"subject_id": subject_id}
        if not include_class_materials:
            return {"$and": [base, {"source_tier": {"$in": ["official", "administration"]}}]}
        return {"$and": [
            base,
            {"$or": [
                {"source_tier": {"$in": ["official", "administration"]}},
                {"$and": [
                    {"source_tier": "teacher"},
                    {"class_id": {"$in": enrolled_class_ids or []}},
                ]},
            ]},
        ]}

    def delete(self, material_id):
        self._ensure()
        if self.collection:
            try:
                self.collection.delete(where={"material_id": material_id})
            except Exception:
                pass

    def index(self, material_id, text, metadata):
        self._ensure()
        chunks = [text[i:i + 1200] for i in range(0, len(text), 1000)] or [""]
        enriched = [{**metadata, "material_id": material_id, "chunk_index": i} for i in range(len(chunks))]
        if self.collection:
            self.collection.upsert(ids=[f"{material_id}-{i}" for i in range(len(chunks))], documents=chunks, metadatas=enriched)
        else:
            self.documents.extend(zip(chunks, enriched))

    def query(self, prompt, where, k=4):
        self._ensure()
        if self.collection:
            try:
                return self.collection.query(query_texts=[prompt], n_results=k, where=where)
            except Exception:
                return {"documents": [[]], "metadatas": [[]], "distances": [[]]}
        # Lightweight fallback used when Chroma is unavailable in development/tests.
        def matches(metadata):
            if "$and" in where:
                return all(matches(part) for part in where["$and"])
            if "$or" in where:
                return any(matches(part) for part in where["$or"])
            for key, value in where.items():
                actual = metadata.get(key)
                if isinstance(value, dict) and "$in" in value:
                    if actual not in value["$in"]:
                        return False
                elif actual != value:
                    return False
            return True
        selected = [(doc, metadata) for doc, metadata in self.documents if matches(metadata)][:k]
        return {"documents": [[doc for doc, _ in selected]], "metadatas": [[metadata for _, metadata in selected]], "distances": [[0.1] * len(selected)]}


rag = RAGService()
