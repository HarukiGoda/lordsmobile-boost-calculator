import { useEffect, useState, useMemo } from "react"
import Image from "next/image"

import { Button } from "@workspace/ui/components/button"
import { EditableBoostsTable } from "@/components/boost/editable-boosts-table"
import { EditableBoost } from "@/lib/boost/types"
import { normalizeBoost } from "@/lib/boost/normalize"
import { NextStepButton } from "@/components/steps/next-step"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { InfoIcon } from "lucide-react"
import croppingSample from "@/public/cropping-sample.png"
import { encodeBoosts } from "@/lib/codec/boost-codec"
import { useBoostsParam } from "@/hooks/use-boosts-param"
import { PrevStepButton } from "../steps/prev-step"

export function LeftCardActions({
  step,
  loading,
  img,
  onReanalyze,
}: {
  step: number
  loading: boolean
  img: File | Blob | null
  onReanalyze: () => void
}) {
  return (
    <>
      <PrevStepButton nextStep={step - 2}>画像の選択に戻る</PrevStepButton>
      <Button size="lg" onClick={onReanalyze} disabled={loading || !img}>
        {loading ? "Analyzing..." : "画像を再解析"}
      </Button>
    </>
  )
}

export function OcrResultSection({
  step,
  loading,
  parsedBoosts,
}: {
  step: number
  loading: boolean
  parsedBoosts: EditableBoost[]
}) {
  const [boostsState, setBoostsState] = useState<EditableBoost[]>([])
  const [encodedBoosts, setEncodedBoosts] = useState<string>("")

  const getBoostsParam = useBoostsParam()

  const currentBoosts = useMemo(() => {
    return boostsState.length > 0 ? boostsState : parsedBoosts
  }, [boostsState, parsedBoosts])

  useEffect(() => {
    let active = true

    const syncBoosts = async () => {
      const existing = await getBoostsParam()

      const targetBoosts = [
        ...(existing ?? []),
        ...currentBoosts.map(normalizeBoost),
      ]
      const encoded = await encodeBoosts(targetBoosts)

      if (active) {
        setEncodedBoosts(encoded)
      }
    }

    void syncBoosts()
    return () => {
      active = false
    }
  }, [currentBoosts, getBoostsParam])

  return (
    <Card className="col-span-12 row-span-2 grid grid-rows-subgrid lg:col-span-6">
      <CardContent>
        {!loading ? (
          <EditableBoostsTable
            key={parsedBoosts.map((b) => b.boost.name).join()}
            initialBoosts={currentBoosts}
            onChange={setBoostsState}
          />
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            テキストを解析中...
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-around">
        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg" variant="ghost">
                <InfoIcon />
                読み取りがうまくいかない時は...
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>読み取りのコツ</DialogTitle>
              <DialogDescription>
                ブースト値以外の物が含まれないようにしてください
              </DialogDescription>
            </DialogHeader>
            <Image
              src={croppingSample}
              alt="cropping-sample"
              className="mx-auto"
            />
          </DialogContent>
        </Dialog>

        <NextStepButton
          nextStep={step + 1}
          disabled={loading || currentBoosts.length === 0 || !encodedBoosts}
          updateParams={{ boosts: encodedBoosts }}
        >
          次へ
        </NextStepButton>
      </CardFooter>
    </Card>
  )
}
