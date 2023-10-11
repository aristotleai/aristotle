from typing import Optional
import logging
from datetime import datetime
from fastapi import HTTPException
from db.mongo.collections import SERVERS
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from .providers import ProviderCollection
from ..models.servers import (
    ServerCreateBaseModel,
    ServerCreateModel,
    ServerModelOut
)

class ServerCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(SERVERS)


    async def create_server(
        self,
        server_details: ServerCreateBaseModel,
        username: str
    ) -> any:
        try:
            provider_collection = ProviderCollection()
            provider = await provider_collection.get_provider_by_code(provider_code=username)
            if provider is None:
                return None

            existing_server = await self.get_server_by_code(server_code=server_details.server_code)
            if existing_server is not None:
                return None

            server_details_full = ServerCreateModel(
                **server_details.dict(),
                created_by = username,
                provider_code = provider.provider_code,
                provider_name = provider.provider_name
            )

            insert_id = await self.collection.insert_one(
                server_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def delete_server(
        self,
        server_code: str,
        username: str
    ) -> any:
        try:
            existing_server = await self.get_server_by_code(server_code=server_code)
            if existing_server is None:
                return None

            if existing_server.created_by != username:
                return None

            existing_server.is_updated = True
            existing_server.updated_at = datetime.now()
            existing_server.is_deleted = True
            existing_server.deleted_at = datetime.now()

            finder = {"server_code": server_code}
            updater = {"$set": existing_server.dict()}

            deleted_server = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return deleted_server if deleted_server else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_servers(
            self,
            provider_code: Optional[str] = None
        ) -> any:
        try:
            filter_condition = {"is_deleted": False}
            if provider_code is not None:
                filter_condition["provider_code"] = provider_code

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=ServerModelOut,
            )

            return data if data else []

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_server_by_code(
        self,
        server_code: str
    ) -> any:
        try:
            finder = {"server_code": server_code}

            server = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=ServerModelOut
            )

            return server if server else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def change_server_availability(
        self,
        server_code: str,
        is_available: bool,
        username: str
    ) -> any:
        try:
            existing_server = await self.get_server_by_code(server_code=server_code)
            if existing_server is None:
                return None

            if existing_server.created_by != username:
                return None

            existing_server.is_updated = True
            existing_server.updated_at = datetime.now()
            existing_server.is_available = is_available

            finder = {"server_code": server_code}
            updater = {"$set": existing_server.dict()}

            updated_server = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_server if updated_server else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_available_servers(
            self
    ) -> any:
        try:
            filter_condition = {"is_deleted": False, "is_available": True}

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=ServerModelOut,
            )

            return data if data else []
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")