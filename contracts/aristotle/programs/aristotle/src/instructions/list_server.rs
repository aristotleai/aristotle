use crate::state::provider::*;
use crate::state::server::*;
use anchor_lang::prelude::*;
use crate::errors::DefinedError;

pub fn list_server(ctx: Context<ListServer>, server_id: u64, memory_gb: u8, num_cores: u8, bandwidth_gbps: u32, usage_fee: u64) -> Result<()> {
    let server = &mut ctx.accounts.server;
    let bump = *ctx.bumps.get("server").ok_or(DefinedError::CannotGetBump)?;

    server.list(server_id, memory_gb, num_cores, bandwidth_gbps, usage_fee, bump)
}

#[derive(Accounts)]
#[instruction(server_id: u64)]
pub struct ListServer<'info>{
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer = signer, space = Server::MAXIMUM_SIZE + 8, seeds = [b"server", provider.provider_id.as_ref(), server_id.to_le_bytes().as_ref()], bump)]
    pub server: Account<'info, Server>,

    #[account(constraint = provider.provider_id == *signer.key)]
    pub provider: Account<'info, Provider>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}