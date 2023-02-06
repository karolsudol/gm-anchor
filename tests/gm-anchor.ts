import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GmAnchor } from "../target/types/gm_anchor";
import { assert, expect } from "chai";

describe("gm-anchor", () => {
  const provider = anchor.AnchorProvider.env();
  const user = provider.wallet;
  const program = anchor.workspace.GmAnchor as Program<GmAnchor>;

  it("Should set name correctly:", async () => {
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(
        user.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      )
    );

    const gmAccount = anchor.web3.Keypair.generate();
    const name = "KOKO";

    let tx = await program.rpc.execute(name, {
      accounts: {
        gmAccount: gmAccount.publicKey,
        user: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      options: { commitment: "confirmed" },
      signers: [gmAccount],
    });

    const storedName = await program.account.greetingAccount.fetch(
      gmAccount.publicKey
    );

    expect(storedName.name).equal(name);

    console.log("Your transaction signature", tx);
  });
});
