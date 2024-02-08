import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import { Link } from "@/components/catalyst/link";

export default function About() {
    return (
        <div
            id="about"
            className="scroll-mt-48 mt-12 mb-32 flex items-center justify-center"
        >
            <div className="max-w-3xl">
                <Heading>About</Heading>
                <Subheading>
                    Fill out the form in the dialog box below to send a lunar
                    new year greeting email. The email states that you sent the
                    mail, contains pretty lunar new year images, and has a
                    description of the recipient&apos;s fortune based on their
                    Zodiac sign. Please let me know if an email doesn&apos;t
                    send or a different issue with this website appears! This
                    website is a fun project made by{" "}
                    <Link href="https://darenhua.netlify.app/">Daren Hua</Link>{" "}
                    in the spirit of Chinese New Year. Made with React, Flask,
                    and{" "}
                    <Link href="https://resend.com/" target="_blank">
                        resend
                    </Link>
                    . No emails or sensitive data is stored.
                </Subheading>
            </div>
        </div>
    );
}
