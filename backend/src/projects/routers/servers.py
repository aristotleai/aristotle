import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from ..crud.servers import ServerCollection
from ..models.servers import (
    ServerCreateBaseModel
)

router = APIRouter()


@router.post(
    "/v1/servers/create_server",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def create_server(
    server_details: ServerCreateBaseModel,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        server_collection = ServerCollection()
        insert_id = await server_collection.create_server(server_details=server_details, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "server successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "server not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post(
    "/v1/servers/delete_server",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def delete_server(
    server_code: str,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        server_collection = ServerCollection()
        server_id = await server_collection.delete_server(server_code=server_code, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "server successfully disabled", "data": server_id } if server_id else { "InternalResponseCode": 1, "Message": "server not disabled", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/servers/get_server_by_code",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_server_by_code(
    server_code: str
):
    try:
        server_collection = ServerCollection()
        server_data = await server_collection.get_server_by_code(server_code=server_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "server", "data": server_data } if server_data is not None else { "InternalResponseCode": 1, "Message": "server not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/servers/get_all_servers",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_all_servers(
    provider_code: Optional[str] = None
):
    try:
        server_collection = ServerCollection()
        server_list = await server_collection.get_all_servers(provider_code=provider_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "servers fetched", "data": server_list } if server_list is not None else { "InternalResponseCode": 1, "Message": "servers not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/servers/change_server_availability",
    dependencies=[Security(get_current_active_user, scopes=["loggedin:write"])],
)
async def change_server_availability(
    server_code: str,
    is_available: bool,
    current_user: str = Security(get_current_active_user, scopes=["loggedin:write"])
):
    try:
        server_collection = ServerCollection()
        server_id = await server_collection.change_server_availability(server_code=server_code, is_available=is_available, username=current_user.username)

        return { "InternalResponseCode": 0, "Message": "server availibility successfully updated", "data": server_id } if server_id else { "InternalResponseCode": 1, "Message": "server availability not updated", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")