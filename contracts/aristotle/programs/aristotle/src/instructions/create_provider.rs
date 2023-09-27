use crate::state::provider::*;
use anchor_lang::prelude::*;

pub fn create_provider(ctx: Context<CreateProvider>, name: String) -> Result<()> {
    let provider = &mut ctx.accounts.provider;
    let provider_key = provider.key();
    provider.create(provider_key, name)
}

#[derive(Accounts)]
pub struct CreateProvider<'info>{
    #[account(init, payer = signer, space = 8 + Provider::MAXIMUM_SIZE)]
    pub provider: Account<'info, Provider>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>
}