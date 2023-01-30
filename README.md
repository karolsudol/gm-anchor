# gm-anchor

## deployment

`solana address -k ./target/deploy/gm_anchor-keypair.json`

`anchor build`

`anchor build` with new app_id

`solana config set --url http://127.0.0.1:8899`

`solana-test-validator`

`solana-keygen new -o id.json`

`solana airdrop 2 $(solana-keygen pubkey ./id.json)`

`anchor deploy`
