from app.models import Base
from alembic import context

target_metadata = Base.metadata

def run_migrations_online():
    from sqlalchemy import engine_from_config, pool
    configuration = context.config.get_section(context.config.config_ini_section) or {}
    connectable = engine_from_config(configuration, prefix="sqlalchemy.", poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

run_migrations_online()
