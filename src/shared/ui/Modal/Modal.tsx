import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import {
  Modal as NextUiModal,
  ModalContent as NextUiModalContent,
  ModalHeader as NextUiModalHeader,
  ModalBody as NextUiModalBody,
  ModalFooter as NextUiModalFooter,
} from "@nextui-org/react";
import { cn } from "@/util/cn";

const Modal = NextUiModal;

const ModalContent = forwardRef<
  ElementRef<typeof NextUiModalContent>,
  ComponentPropsWithoutRef<typeof NextUiModalContent>
>(({ className, children, ...props }, ref) => (
  <NextUiModalContent ref={ref} className={cn("", className)} {...props}>
    {children}
  </NextUiModalContent>
));
ModalContent.displayName = "ModalContent";

const ModalHeader = forwardRef<
  ElementRef<typeof NextUiModalHeader>,
  ComponentPropsWithoutRef<typeof NextUiModalHeader>
>(({ className, children, ...props }, ref) => (
  <NextUiModalHeader ref={ref} className={cn("", className)} {...props}>
    {children}
  </NextUiModalHeader>
));
ModalHeader.displayName = "ModalHeader";

const ModalBody = forwardRef<
  ElementRef<typeof NextUiModalBody>,
  ComponentPropsWithoutRef<typeof NextUiModalBody>
>(({ className, children, ...props }, ref) => (
  <NextUiModalBody ref={ref} className={cn("", className)} {...props}>
    {children}
  </NextUiModalBody>
));
ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<
  ElementRef<typeof NextUiModalFooter>,
  ComponentPropsWithoutRef<typeof NextUiModalFooter>
>(({ className, children, ...props }, ref) => (
  <NextUiModalFooter ref={ref} className={cn("", className)} {...props}>
    {children}
  </NextUiModalFooter>
));
ModalFooter.displayName = "ModalFooter";

export { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader };
