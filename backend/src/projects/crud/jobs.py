from typing import Optional
import logging
from datetime import datetime
from fastapi import HTTPException
from db.mongo.collections import JOBS
from db.mongo.mongo_base import MongoBase
from master.models.master import BaseIsCreated
from ..models.jobs import (
    JobCreateBaseModel,
    JobCreateModel,
    JobModelOut
)

class JobCollection:
    def __init__(self):
        self.collection = MongoBase()
        self.collection(JOBS)


    async def create_job(
        self,
        job_details: JobCreateBaseModel,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_details.job_code)
            if existing_job is not None:
                return None

            job_details_full = JobCreateModel(
                **job_details.dict(),
                created_by = username
            )

            insert_id = await self.collection.insert_one(
                job_details_full.dict(),
                return_doc_id=True,
                extended_class_model=BaseIsCreated,
            )

            return insert_id if insert_id else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def delete_job(
        self,
        job_code: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.is_deleted = True
            existing_job.deleted_at = datetime.now()

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            deleted_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return deleted_job if deleted_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_all_jobs(
            self,
            taker_code: Optional[str] = None
        ) -> any:
        try:
            filter_condition = {"is_deleted": False}
            if taker_code is not None:
                filter_condition["taker_code"] = taker_code

            sort = [("created_at", -1)]
            data = await self.collection.find(
                finder=filter_condition,
                return_doc_id=True,
                sort=sort,
                extended_class_model=JobModelOut,
            )

            return data if data else []

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def get_job_by_code(
        self,
        job_code: str
    ) -> any:
        try:
            finder = {"job_code": job_code}

            job = await self.collection.find_one(
                finder=finder,
                return_doc_id=True,
                extended_class_model=JobModelOut
            )

            return job if job else None

        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def mark_job_assigned(
        self,
        job_code: str,
        provider_code: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.assigned_to = provider_code
            existing_job.is_open = False

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            updated_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_job if updated_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def clear_job_assigned(
        self,
        job_code: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.assigned_to = None
            existing_job.is_open = True

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            updated_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_job if updated_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def mark_job_completed(
        self,
        job_code: str,
        result_storage_id: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.is_completed = True
            existing_job.result_storage_id = result_storage_id

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            updated_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_job if updated_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def remove_job_completed(
        self,
        job_code: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.is_completed = False
            existing_job.result_storage_id = None

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            updated_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_job if updated_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    async def report_job_ill_defined(
        self,
        job_code: str,
        username: str
    ) -> any:
        try:
            existing_job = await self.get_job_by_code(job_code=job_code)
            if existing_job is None:
                return None

            if existing_job.created_by != username:
                return None

            existing_job.is_updated = True
            existing_job.updated_at = datetime.now()
            existing_job.ill_defined_reports = existing_job.ill_defined_reports + 1

            finder = {"job_code": job_code}
            updater = {"$set": existing_job.dict()}

            updated_job = await self.collection.find_one_and_modify(
                find=finder,
                update=updater
            )

            return updated_job if updated_job else None
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")