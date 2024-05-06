


import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"

export default function View() {
  return (
    <>
      
      <div className="h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Title</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6">
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0 ">
                  <div className="flex h-full flex-col space-y-4">
                    <Card
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    ><pre>d d</pre></Card>
                    <div className="flex items-center space-x-2 ">
                      <Button >수정하기</Button>
                      <Button variant="secondary">
                        리스트로
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}