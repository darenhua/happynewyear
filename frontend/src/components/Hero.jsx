import Title from "@/components/Title";
import Subheading from "@/components/Subheading";
import { Button } from "@/components/catalyst/button";
import { Link } from "@/components/catalyst/link";

export default function Hero() {
    return (
        <div className="min-h-[500px] -sm:max-w-72 -sm:mx-auto mb-24">
            <div className="flex gap-14 justify-center items-center -lg:flex-col">
                <div className="max-w-xl -lg:order-2 -lg:flex -lg:flex-col -lg:items-center ">
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
                    className="h-32 -lg:order-1 -lg:mt-20 w-auto dark:invert"
                    src="logo.svg"
                    alt="Your Company"
                />
            </div>
        </div>
    );
}
