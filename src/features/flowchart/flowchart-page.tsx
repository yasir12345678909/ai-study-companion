import { useState, useMemo, useCallback } from 'react'
import { ReactFlow, Controls, Background, MiniMap, useNodesState, useEdgesState, type Node, type Edge, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ArrowLeft, Maximize2, LayoutTemplate } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { momentumFlowchartNodes, momentumFlowchartEdges } from '@/data/mock-data'
import type { FlowchartNode as FlowchartNodeType } from '@/types'

// Map our custom node types to colors and icons
const getNodeTypeColors = (type: string) => {
  switch (type) {
    case 'concept': return 'bg-brand-500/10 border-brand-500 text-brand-500'
    case 'formula': return 'bg-warning/10 border-warning text-warning'
    case 'definition': return 'bg-success/10 border-success text-success'
    case 'example': return 'bg-info/10 border-info text-info'
    default: return 'bg-surface-200 border-surface-400 text-surface-900 dark:text-surface-50'
  }
}

// Custom Node Component
const CustomNode = ({ data, selected }: { data: any, selected: boolean }) => {
  return (
    <div
      className={cn(
        "relative rounded-lg border-2 p-4 shadow-sm bg-surface-0 dark:bg-surface-900 transition-all min-w-[200px]",
        selected ? "border-brand-500 shadow-brand-500/20 shadow-lg" : "border-surface-300 dark:border-surface-700"
      )}
    >
      <div className={cn(
        "absolute -top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border",
        getNodeTypeColors(data.type)
      )}>
        {data.type}
      </div>
      <div className="mt-2 font-semibold text-surface-900 dark:text-surface-50 text-sm">
        {data.label}
      </div>
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

export function FlowchartPage() {
  const [selectedNode, setSelectedNode] = useState<FlowchartNodeType | null>(null)
  
  // Transform mock data to ReactFlow format
  const initialNodes: Node[] = useMemo(() => {
    return momentumFlowchartNodes.map((n, i) => {
      // Basic tree layout calculation
      const level = n.id.split('-').length
      const x = 250 + (i % 3) * 200 - 200 // simple spread
      const y = level * 150
      
      return {
        id: n.id,
        position: { x: (n as any).position?.x || x, y: (n as any).position?.y || y },
        data: { label: n.label || n.title, type: n.type, content: n.content, original: n },
        type: 'custom',
      }
    })
  }, [])

  const initialEdges: Edge[] = useMemo(() => {
    return momentumFlowchartEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: 'currentColor', opacity: 0.5 },
      className: 'text-surface-400 dark:text-surface-500'
    }))
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onNodeClick = useCallback((event: any, node: Node) => {
    setSelectedNode(node.data.original as FlowchartNodeType)
  }, [])

  const handleReset = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2, duration: 800 })
    }
    setSelectedNode(null)
  }

  return (
    <div className="flex flex-col h-screen bg-surface-50 dark:bg-surface-950">
      {/* Header */}
      <header className="flex-none bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-4 shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-surface-600 dark:text-surface-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-surface-900 dark:text-surface-50 flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-brand-500" />
              Visual Revision
            </h1>
            <p className="text-xs text-surface-500 dark:text-surface-400">Physics {'>'} Momentum</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-surface-600 dark:text-surface-300 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-md transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </header>

      {/* Main Flowchart Area */}
      <div className="flex-grow relative flex">
        <div className="flex-grow h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            maxZoom={4}
            proOptions={{ hideAttribution: true }}
            className="bg-surface-50 dark:bg-surface-950"
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={2} className="opacity-50" />
            <Controls className="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-800 shadow-sm fill-surface-600 dark:fill-surface-300" />
            <MiniMap 
              className="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-800 shadow-sm"
              nodeColor={(node) => {
                switch(node.data.type) {
                  case 'concept': return '#6366f1'
                  case 'formula': return '#eab308'
                  case 'definition': return '#22c55e'
                  default: return '#94a3b8'
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
          </ReactFlow>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute top-4 right-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto bg-surface-0 dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 z-10 flex flex-col"
            >
              <div className="p-4 border-b border-surface-100 dark:border-surface-800 flex justify-between items-center sticky top-0 bg-surface-0/95 dark:bg-surface-900/95 backdrop-blur-sm">
                <span className={cn(
                  "px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border",
                  getNodeTypeColors(selectedNode.type)
                )}>
                  {selectedNode.type}
                </span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="p-1 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4 text-surface-500" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <h3 className="font-bold text-lg text-surface-900 dark:text-surface-50">{selectedNode.title || selectedNode.label}</h3>
                <div className="prose prose-sm dark:prose-invert text-surface-600 dark:text-surface-300">
                  {(selectedNode.content || selectedNode.label || '').split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
