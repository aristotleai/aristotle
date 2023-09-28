import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from ..crud.takers import TakerCollection
from ..models.takers import (
    TakerCreateBaseModel
)

router = APIRouter()


@router.post(
    "/v1/takers/create_taker",
    dependencies=[Security(get_current_active_user, scopes=["admin:write"])],
)
async def create_taker(
    taker_details: TakerCreateBaseModel
):
    try:
        taker_collection = TakerCollection()
        insert_id = await taker_collection.create_taker(taker_details=taker_details)

        return { "InternalResponseCode": 0, "Message": "taker successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "taker not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post(
    "/v1/takers/delete_taker",
    dependencies=[Security(get_current_active_user, scopes=["admin:write"])],
)
async def delete_taker(
    taker_code: str
):
    try:
        taker_collection = TakerCollection()
        taker_id = await taker_collection.delete_taker(taker_code=taker_code)

        return { "InternalResponseCode": 0, "Message": "taker successfully disabled", "data": taker_id } if taker_id else { "InternalResponseCode": 1, "Message": "taker not disabled", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/takers/get_taker_by_code",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_taker_by_code(
    taker_code: str
):
    try:
        taker_collection = TakerCollection()
        taker_data = await taker_collection.get_taker_by_code(taker_code=taker_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "taker", "data": taker_data } if taker_data is not None else { "InternalResponseCode": 1, "Message": "taker not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/takers/get_all_takers",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_all_takers():
    try:
        taker_collection = TakerCollection()
        taker_list = await taker_collection.get_all_takers()
                                                        
        return { "InternalResponseCode": 0, "Message": "takers fetched", "data": taker_list } if taker_list is not None else { "InternalResponseCode": 1, "Message": "takers not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")