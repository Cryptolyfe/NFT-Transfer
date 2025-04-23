export const erc721Abi = [
    {
      constant: true,
      inputs: [{ name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [
        { name: "owner", type: "address" },
        { name: "index", type: "uint256" }
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [{ name: "tokenId", type: "uint256" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ name: "uri", type: "string" }],
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "tokenId", type: "uint256" }
      ],
      name: "safeTransferFrom",
      outputs: [],
      type: "function"
    }
  ];
  