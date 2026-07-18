"use client"

const FORMAT: CompressionFormat = "gzip"

export async function compress(input: string): Promise<Uint8Array> {
  const stream = new Blob([input]).stream()
  const compressedStream = stream.pipeThrough(new CompressionStream(FORMAT))

  const arrayBuffer = await new Response(compressedStream).arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

export async function decompress(input: Uint8Array): Promise<string> {
  const bytes = new Uint8Array(input)

  const stream = new Blob([bytes.buffer]).stream()
  const decompressedStream = stream.pipeThrough(new DecompressionStream(FORMAT))

  const arrayBuffer = await new Response(decompressedStream).arrayBuffer()
  return new TextDecoder().decode(arrayBuffer)
}
