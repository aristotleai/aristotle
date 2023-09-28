import logging
from datetime import datetime
from fastapi import HTTPException
from db.mongo.collections import PROVIDERS
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from ..models.providers import (
    ProviderCreateBaseModel,
    ProviderCreateModel,
    ProviderModelOut
)

class ProviderCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(PROVIDERS)


    async def create_provider(
        self,
        provider_details: ProviderCreateBaseModel,
    ) -> any:
        try:
            existing_provider = await self.get_provider_by_code(provider_code=provider_details.provider_code)
            if existing_provider is not None:
                return None

            provider_details_full = ProviderCreateModel(
                **provider_details.dict()
            )

            insert_id = await self.collection.insert_one(
                provider_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def delete_provider(
        self,
        provider_code: str,
    ) -> any:
        try:
            existing_provider = await self.get_provider_by_code(provider_code=provider_code)
            if existing_provider is None:
                return None

            existing_provider.is_updated = True
            existing_provider.updated_at = datetime.now()
            existing_provider.is_deleted = True
            existing_provider.deleted_at = datetime.now()

            finder = {"provider_code": provider_code}
            updater = {"$set": existing_provider.dict()}

            deleted_provider = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return deleted_provider if deleted_provider else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_providers(
            self
        ) -> any:
        try:
            filter_condition = {"is_deleted": False}

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=ProviderModelOut,
            )

            return data if data else []

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_provider_by_code(
        self,
        provider_code: str
    ) -> any:
        try:
            finder = {"provider_code": provider_code}

            provider = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=ProviderModelOut
            )

            return provider if provider else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")