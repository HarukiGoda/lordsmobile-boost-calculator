import { Boost } from "../boost/types"
import { compress, decompress } from "./compress"
import { base64ToUint8Array, uint8ArrayToBase64 } from "./base64"

export async function encodeBoosts(boosts: Boost[]): Promise<string> {
  const json = JSON.stringify(boosts)

  const compressed = await compress(json)

  return uint8ArrayToBase64(compressed)
}

export async function decodeBoosts(encoded: string): Promise<Boost[]> {
  const compressed = base64ToUint8Array(encoded)
  const json = await decompress(compressed)

  return JSON.parse(json)
}
