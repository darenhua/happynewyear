import Title from "@/components/Title";
import Subheading from "@/components/Subheading";
import { Button } from "@/components/catalyst/button";
import { Link } from "@/components/catalyst/link";

export default function Hero() {
    return (
        <div className="min-h-[80vh]">
            <div className="flex gap-14 items-center">
                <div className="max-w-xl">
                    <Title>
                        Tell your friends{" "}
                        <span className="text-red-500">
                            Happy Year of the Dragon
                        </span>
                    </Title>
                    <Subheading>
                        Celebrate the lunar new year by sending your loved ones
                        a lucky email!
                    </Subheading>
                    <Button className="" outline>
                        <Link href="#new-email-form">
                            Send an email right now
                        </Link>
                    </Button>
                </div>
                <img
                    className="h-32 w-auto dark:invert"
                    src="/src/assets/logo.svg"
                    alt="Your Company"
                />
            </div>
        </div>
    );
}
