import logging
from datetime import datetime
from fastapi import HTTPException
from db.mongo.collections import TAKERS
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from ..models.takers import (
    TakerCreateBaseModel,
    TakerCreateModel,
    TakerModelOut
)

class TakerCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(TAKERS)


    async def create_taker(
        self,
        taker_details: TakerCreateBaseModel,
    ) -> any:
        try:
            existing_taker = await self.get_taker_by_code(taker_code=taker_details.taker_code)
            if existing_taker is not None:
                return None

            taker_details_full = TakerCreateModel(
                **taker_details.dict()
            )

            insert_id = await self.collection.insert_one(
                taker_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def delete_taker(
        self,
        taker_code: str,
    ) -> any:
        try:
            existing_taker = await self.get_taker_by_code(taker_code=taker_code)
            if existing_taker is None:
                return None

            existing_taker.is_updated = True
            existing_taker.updated_at = datetime.now()
            existing_taker.is_deleted = True
            existing_taker.deleted_at = datetime.now()

            finder = {"taker_code": taker_code}
            updater = {"$set": existing_taker.dict()}

            deleted_taker = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return deleted_taker if deleted_taker else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_takers(
            self
        ) -> any:
        try:
            filter_condition = {"is_deleted": False}

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=TakerModelOut,
            )

            return data if data else []

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_taker_by_code(
        self,
        taker_code: str
    ) -> any:
        try:
            finder = {"taker_code": taker_code}

            taker = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=TakerModelOut
            )

            return taker if taker else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")