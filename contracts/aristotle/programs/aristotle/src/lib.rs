use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("bipJ9KDH5c6hmU9HKQCGq7ejbWTwzhoczhyTkRcWjXr");

#[program]
pub mod aristotle {
    use super::*;

    pub fn create_provider(ctx: Context<CreateProvider>, name: String) -> Result<()> {
        instructions::create_provider::create_provider(ctx, name)
    }

    pub fn create_taker(ctx: Context<CreateTaker>, name: String) -> Result<()> {
        instructions::create_taker::create_taker(ctx, name)
    }

    pub fn list_server(ctx: Context<ListServer>, server_id: u64, memory_gb: u8, num_cores: u8, bandwidth_gbps: u32, usage_fee: u64) -> Result<()> {
        instructions::list_server::list_server(ctx, server_id, memory_gb, num_cores, bandwidth_gbps, usage_fee)
    }

    pub fn delist_server(ctx: Context<DelistServer>) -> Result<()> {
        instructions::delist_server::delist_server(ctx)
    }

    pub fn mark_server_available(ctx: Context<MarkServerAvailability>, is_available: bool) -> Result<()> {
        instructions::mark_server_availability::mark_server_availability(ctx, is_available)
    }

    pub fn create_job(ctx: Context<CreateJob>, job_id: u64, name: String, description: String, storage_id: String, req_memory: u32, req_cores: u8, req_bandwidth: u32, req_server_time: u32) -> Result<()> {
        instructions::create_job::create_job(ctx, job_id, name, description, storage_id, req_memory, req_cores, req_bandwidth, req_server_time)
    }

    pub fn cancel_job(ctx: Context<CancelJob>) -> Result<()> {
        instructions::cancel_job::cancel_job(ctx)
    }

    pub fn assign_job(ctx: Context<AssignJob>) -> Result<()> {
        instructions::assign_job::assign_job(ctx)
    }

    pub fn mark_job_abandoned(ctx: Context<MarkJobAbandoned>) -> Result<()> {
        instructions::mark_job_abandoned::mark_job_abandoned(ctx)
    }

    pub fn mark_job_completed(ctx: Context<MarkJobCompleted>, result_storage_id: String) -> Result<()> {
        instructions::mark_job_completed::mark_job_completed(ctx, result_storage_id)
    }

    pub fn report_job_ill_defined(ctx: Context<ReportJobIllDefined>) -> Result<()> {
        instructions::report_job_ill_defined::report_job_ill_defined(ctx)
    }

    pub fn verify_completed_job(ctx: Context<VerifyCompletedJob>) -> Result<()> {
        instructions::verify_completed_job::verify_completed_job(ctx)
    }

    pub fn reject_completed_job(ctx: Context<RejectCompletedJob>) -> Result<()> {
        instructions::reject_completed_job::reject_completed_job(ctx)
    }
}
