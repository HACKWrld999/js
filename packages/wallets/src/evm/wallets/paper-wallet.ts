import {
  PaperWalletConnectionArgs,
  PaperWalletAdditionalOptions as PaperWalletAdditionalOptions_,
} from "../connectors/paper/types";
import { Connector } from "../interfaces/connector";
import { AbstractClientWallet, WalletOptions } from "./base";
import type { Chain } from "@thirdweb-dev/chains";
import type { PaperWalletConnector } from "../connectors/paper";
import { walletIds } from "../constants/walletIds";

export type { PaperWalletAdditionalOptions } from "../connectors/paper/types";

export type PaperWalletOptions = WalletOptions<PaperWalletAdditionalOptions_>;

export class PaperWallet extends AbstractClientWallet<
  PaperWalletAdditionalOptions_,
  PaperWalletConnectionArgs
> {
  connector?: Connector;

  static id = walletIds.paper;

  static meta = {
    name: "Paper Wallet",
    iconURL:
      "ipfs://QmNrLXtPoFrh4yjZbXui39zUMozS1oetpgU8dvZhFAxfRa/paper-logo-icon.svg",
  };

  public get walletName() {
    return "Paper Wallet" as const;
  }

  clientId: PaperWalletAdditionalOptions_["clientId"];
  chain: PaperWalletAdditionalOptions_["chain"];

  constructor(options: PaperWalletOptions) {
    super(PaperWallet.id, {
      ...options,
    });

    this.clientId = options.clientId;
    this.chain = options.chain;
  }

  protected async getConnector(): Promise<Connector> {
    if (!this.connector) {
      const { PaperWalletConnector } = await import("../connectors/paper");
      this.connector = new PaperWalletConnector({
        clientId: this.clientId,
        chain: this.chain,
        chains: this.chains,
        advancedOptions: {
          recoveryShareManagement:
            this.options?.advancedOptions?.recoveryShareManagement,
        },
        styles: this.options?.styles,
      });
    }
    return this.connector;
  }

  async updateChains(chains: Chain[]) {
    this.chains = chains;
  }

  async getEmail() {
    const connector = (await this.getConnector()) as PaperWalletConnector;
    return connector.getEmail();
  }
}
