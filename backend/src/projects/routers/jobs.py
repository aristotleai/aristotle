import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from ..crud.jobs import JobCollection
from ..models.jobs import (
    JobCreateBaseModel
)

router = APIRouter()


@router.post(
    "/v1/jobs/create_job",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def create_job(
    job_details: JobCreateBaseModel,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        insert_id = await job_collection.create_job(job_details=job_details, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "job not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post(
    "/v1/jobs/delete_job",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def delete_job(
    job_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.delete_job(job_code=job_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully disabled", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "job not disabled", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/get_job_by_code",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_job_by_code(
    job_code: str
):
    try:
        job_collection = JobCollection()
        job_data = await job_collection.get_job_by_code(job_code=job_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "job", "data": job_data } if job_data is not None else { "InternalResponseCode": 1, "Message": "job not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/get_all_jobs",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_all_jobs(
    taker_code: Optional[str] = None
):
    try:
        job_collection = JobCollection()
        job_list = await job_collection.get_all_jobs(taker_code=taker_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "jobs fetched", "data": job_list } if job_list is not None else { "InternalResponseCode": 1, "Message": "jobs not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/mark_job_assigned",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def mark_job_assigned(
    job_code: str,
    assigned_provider_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.mark_job_assigned(job_code=job_code, provider_code=assigned_provider_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully marked assigned", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "job not marked assigned", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/clear_job_assigned",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def clear_job_assigned(
    job_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.clear_job_assigned(job_code=job_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully cleared assigned", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "job not cleared assigned", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/mark_job_completed",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def mark_job_completed(
    job_code: str,
    result_storage_id: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.mark_job_completed(job_code=job_code, result_storage_id=result_storage_id, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully marked completed", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "job not marked completed", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/remove_job_completed",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def remove_job_completed(
    job_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.remove_job_completed(job_code=job_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "Completion status removed", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "Completion status removed", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/report_job_ill_defined",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def report_job_ill_defined(
    job_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        job_collection = JobCollection()
        job_id = await job_collection.report_job_ill_defined(job_code=job_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "job successfully marked ill-defined", "data": job_id } if job_id else { "InternalResponseCode": 1, "Message": "job not marked ill-defined", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/jobs/find_server_for_job",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def find_server_for_job(
    job_code: str
):
    try:
        job_collection = JobCollection()
        server_details = await job_collection.find_server_for_job(job_code=job_code)

        return { "InternalResponseCode": 0, "Message": "server found", "data": server_details } if server_details is not None else { "InternalResponseCode": 1, "Message": "server not found", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")