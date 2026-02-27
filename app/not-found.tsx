import { Button } from "../components/Ui/button";
import DecryptedText from "@/DecryptedText";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "../components/Ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            <Empty>
                <EmptyHeader>
                    <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
                        404
                    </EmptyTitle>
                    <EmptyDescription className="-mt-8 text-nowrap text-foreground/80 flex flex-col items-center gap-2">
                    
                      <DecryptedText
                        text="Wrong Move"
                        className="text-2xl font-semibold"
                      />
                    
                      <DecryptedText
                        text="Probably a missing semicolon."
                        className="text-base opacity-70"
                      />

                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button asChild>
                        <Link href="/">
                                <HomeIcon
                                className="size-4 mr-2" data-icon="inline-start" />
                                Go Home
                        </Link>        
                        </Button>

                        <Button asChild variant="outline">
                        <Link href="/collections">
                                <CompassIcon 
                                className="size-4 mr-2" 
                                data-icon="inline-start" />{" "}
                                Explore
                        </Link>
                            
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
}

