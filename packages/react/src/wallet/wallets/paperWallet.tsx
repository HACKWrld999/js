import {
  PaperWallet,
  PaperWalletAdditionalOptions,
} from "@thirdweb-dev/wallets";
import {
  WalletConfig,
  WalletOptions,
  SelectUIProps,
  ConnectUIProps,
  useConnect,
} from "@thirdweb-dev/react-core";
import { useEffect, useRef } from "react";
import { Spinner } from "../../components/Spinner";
import { Flex } from "../../components/basic";
import { InputSelectionUI } from "./InputSelectionUI";

type PaperConfig = Omit<PaperWalletAdditionalOptions, "chain" | "chains">;

export const paperWallet = (config: PaperConfig): WalletConfig<PaperWallet> => {
  return {
    id: PaperWallet.id,
    meta: {
      ...PaperWallet.meta,
      name: "Paper",
      iconURL:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiMwMjEwMTMiLz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfODMpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MyAyNC4zMTE1QzUzIDIzLjczODEgNTIuNjMzMSAyMy4yMzA3IDUyLjA5MzEgMjMuMDU3M0wyNyAxNVYyNy4wMzdMNDEuODU3MiAzMS42MDgyTDI5Ljc4NTcgNDBWNTAuMTg1MUwzMi42MDYxIDUzLjEzOTVMMzAuMjEwMSA1NS4zNDkzQzI5LjkzOTggNTUuNTk4NyAyOS43ODU3IDU1Ljk1MTcgMjkuNzg1NyA1Ni4zMjE4VjY1TDM4LjE0MjkgNTguNTE4NlY0OC4zMzMzTDM1LjY0MjQgNDYuMTQzNkw1MyAzNS4zNzA0VjI0LjMxMTVaIiBmaWxsPSIjMTlBOEQ2Ii8+CjxwYXRoIGQ9Ik01MyAyNC4zMTE1QzUzIDIzLjczODEgNTIuNjMzMSAyMy4yMzA3IDUyLjA5MzEgMjMuMDU3M0wyNyAxNVYyNy4wMzdMNTMgMzUuMzcwNFYyNC4zMTE1WiIgZmlsbD0iIzM5RDBGRiIvPgo8cGF0aCBkPSJNMzguMTQyOCA0OC4zMzMzTDI5Ljc4NTcgNDBWNTAuMTg1MUwzOC4xNDI4IDU4LjUxODZWNDguMzMzM1oiIGZpbGw9IiMzOUQwRkYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzgzIj4KPHJlY3Qgd2lkdGg9IjI2IiBoZWlnaHQ9IjUwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcgMTUpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
    },
    create(options: WalletOptions) {
      return new PaperWallet({ ...options, ...config });
    },
    selectUI: PaperSelectionUI,
    connectUI: PaperConnectionUI,
  };
};

const PaperSelectionUI: React.FC<SelectUIProps<PaperWallet>> = (props) => {
  return (
    <InputSelectionUI
      onSelect={props.onSelect}
      placeholder="Enter your email address"
      name="email"
      type="email"
      errorMessage={(_input) => {
        const input = _input.replace(/\+/g, "");
        const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})$/g;
        const isValidEmail = emailRegex.test(input);
        if (!isValidEmail) {
          return "Invalid email address";
        }
      }}
      emptyErrorMessage="email address is required"
      supportedWallets={props.supportedWallets}
    />
  );
};

const PaperConnectionUI: React.FC<ConnectUIProps<PaperWallet>> = ({
  close,
  walletConfig,
  open,
  selectionData,
  supportedWallets,
}) => {
  const connectPrompted = useRef(false);
  const connect = useConnect();
  const singleWallet = supportedWallets.length === 1;
  useEffect(() => {
    if (connectPrompted.current) {
      return;
    }
    connectPrompted.current = true;

    (async () => {
      close();
      try {
        await connect(walletConfig, { email: selectionData });
      } catch (e) {
        if (!singleWallet) {
          open();
        }
        console.error(e);
      }
    })();
  }, [connect, walletConfig, close, open, singleWallet, selectionData]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "250px",
      }}
    >
      <Spinner size="md" color="neutral" />
    </Flex>
  );
};
