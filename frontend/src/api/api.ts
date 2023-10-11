import axios, { AxiosResponse } from 'axios';
import { LoginInput } from '../models/LoginInput'
import { LoginDetails } from '../models/LoginDetails'
import qs from 'qs';


const BASEURL = "https://api.aristotle-ai.com/v1"

export const login = async (loginInput: LoginInput) => {
    console.log(loginInput);
    const api_call: string = `${BASEURL}/login_or_create?wallet_id=${loginInput.username}`
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
        },
    };
    return axios.post<LoginDetails>(api_call, qs.stringify(loginInput), config);
};

export const getProviders = async (bearerToken: string) => {
    const api_call: string = `${BASEURL}/providers/get_all_providers`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const getJobs = async (bearerToken: string) => {
    const api_call: string = `${BASEURL}/jobs/get_all_jobs`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const getServers = async (bearerToken: string) => {
    console.log("check2")
    const api_call: string = `${BASEURL}/servers/get_all_servers`
    console.log("check3", api_call)
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const getTakers = async (bearerToken: string) => {
    const api_call: string = `${BASEURL}/takers/get_all_takers`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const createProvider = async (bearerToken: string, providerName: string) => {
    const api_call: string = `${BASEURL}/providers/create_provider`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "provider_name": providerName
    }
    return axios.post(api_call, body, config);
};

export const createJob = async (bearerToken: string, jobCode: string, jobName: string, description: string, storageId: string, reqMemory: number, reqCores: number, reqBandwidth: number, reqServerTime: number) => {
    const api_call: string = `${BASEURL}/jobs/create_job`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "job_code": jobCode,
        "job_name": jobName,
        "description": description,
        "storage_id": storageId,
        "req_memory": reqMemory,
        "req_cores": reqCores,
        "req_bandwidth": reqBandwidth,
        "req_server_time": reqServerTime
    }
    return axios.post(api_call, body, config);
};

export const createServer = async (bearerToken: string, serverCode: string, memoryGb: number, numCores: number, bandwidthGbps: number, usageFee: number, isAvailable: boolean) => {
    const api_call: string = `${BASEURL}/servers/create_server`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "server_code": serverCode,
        "memory_gb": memoryGb,
        "num_cores": numCores,
        "bandwidth_gbps": bandwidthGbps,
        "usage_fee": usageFee,
        "is_available": isAvailable
    }
    return axios.post(api_call, body, config);
};

export const createTaker = async (bearerToken: string, takerName: string) => {
    const api_call: string = `${BASEURL}/takers/create_taker`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const body = {
        "taker_name": takerName
    }
    return axios.post(api_call, body, config);
};

export const markJobAssigned = async (bearerToken: string, jobCode: string, assignedProviderCode: string) => {
    const api_call: string = `${BASEURL}/jobs/mark_job_assigned?job_code=${jobCode}&assigned_provider_code=${assignedProviderCode}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const clearJobAssigned = async (bearerToken: string, jobCode: string) => {
    const api_call: string = `${BASEURL}/jobs/clear_job_assigned?job_code=${jobCode}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const markJobCompleted = async (bearerToken: string, jobCode: string, resultStorageId: string) => {
    const api_call: string = `${BASEURL}/jobs/mark_job_completed?job_code=${jobCode}&result_storage_id=${resultStorageId}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const removeJobCompleted = async (bearerToken: string, jobCode: string) => {
    const api_call: string = `${BASEURL}/jobs/remove_job_completed?job_code=${jobCode}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const reportJobIllDefined = async (bearerToken: string, jobCode: string) => {
    const api_call: string = `${BASEURL}/jobs/report_job_ill_defined?job_code=${jobCode}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};

export const changeServerAvailability = async (bearerToken: string, serverCode: string, isAvailable: boolean) => {
    const api_call: string = `${BASEURL}/servers/change_server_availability?server_code=${serverCode}&is_available=${isAvailable}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};


export const findServerForJob = async (bearerToken: string, jobCode: string) => {
    const api_call: string = `${BASEURL}/jobs/find_server_for_job?job_code=${jobCode}`
    const config = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json',
        },
    };
    return axios.get(api_call, config);
};