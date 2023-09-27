use anchor_lang::prelude::*;

#[account]
pub struct Escrow {
    pub server_user: Pubkey,
    pub server_user_token: Pubkey,
    pub usage_fee: u64,
    pub seed: u64,
    pub auth_bump: u8,
    pub vault_bump: u8,
    pub escrow_bump: u8
}

impl Escrow {
    pub const MAXIMUM_SIZE: usize =  32 + 32 + 32 + 8 + 8 + 1 + 1 + 1;

    pub fn init(&mut self, server_user: Pubkey, server_user_token: Pubkey, usage_fee: u64, seed: u64, auth_bump: u8, vault_bump: u8, escrow_bump: u8) -> Result<()> {
        self.server_user = server_user;
        self.server_user_token = server_user_token;
        self.usage_fee = usage_fee;
        self.seed = seed;
        self.auth_bump = auth_bump;
        self.vault_bump = vault_bump;
        self.escrow_bump = escrow_bump;
        Ok(())
    }
}