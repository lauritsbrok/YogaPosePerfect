"use client";

import React from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/shared/ui/Modal/Modal";
import YoutubeEmbed from "@/shared/components/YoutubeEmbed/YoutubeEmbed";

interface YogaPosesHelperModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function YogaPosesHelperModal({
  isOpen,
  onOpenChange,
}: YogaPosesHelperModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Yoga Poses
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Options">
                <Tab key="treePose" title="Tree Pose">
                  <Card>
                    <CardBody>
                      <YoutubeEmbed
                        embedId="Fr5kiIygm0c"
                        className=" aspect-video max-w-full"
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="warriorTwo" title="Warrior II">
                  <Card>
                    <CardBody>
                      <YoutubeEmbed
                        embedId="Mn6RSIRCV3w"
                        className=" aspect-video max-w-full"
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="downwardFacingDog" title="Downward Facing Dog">
                  <Card>
                    <CardBody>
                      <YoutubeEmbed
                        embedId="EC7RGJ975iM"
                        className=" aspect-video max-w-full"
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="fourLimbedStaff" title="Four Limbed Staff">
                  <Card>
                    <CardBody>
                      <YoutubeEmbed
                        embedId="1usSRvFYS6I"
                        className=" aspect-video max-w-full"
                      />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
