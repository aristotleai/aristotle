use crate::state::provider::*;
use crate::state::server::*;
use anchor_lang::prelude::*;

pub fn mark_server_availability(ctx: Context<MarkServerAvailability>, is_available: bool) -> Result<()> {
    let server = &mut ctx.accounts.server;

    if is_available {
        server.mark_available()
    } else {
        server.mark_unavailable()
    }
}

#[derive(Accounts)]
pub struct MarkServerAvailability<'info>{
    #[account(mut, seeds = [b"server", provider.provider_id.as_ref(), server.server_id.to_le_bytes().as_ref()], bump=server.bump)]
    pub server: Account<'info, Server>,

    #[account(constraint = provider.provider_id == *signer.key)]
    pub provider: Account<'info, Provider>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}