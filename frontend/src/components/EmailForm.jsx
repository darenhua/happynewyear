import { useState } from "react";
import {
    Description,
    Field,
    FieldGroup,
    Fieldset,
    Label,
} from "@/components/catalyst/fieldset";
import { Link } from "@/components/catalyst/link";
import {
    Dialog,
    DialogActions,
    DialogBody,
    DialogDescription,
    DialogTitle,
} from "@/components/catalyst/dialog";
import { Switch, SwitchField } from "@/components/catalyst/switch";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Select } from "@/components/catalyst/select";
import Filter from "bad-words";

export default function EmailForm({ handlePending }) {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        target_email: "",
        target_name: "",
        target_zodiac: "Unknown",
        private: true,
    });

    const [errors, setErrors] = useState({});

    const zodiacs = [
        "Unknown",
        "Rat",
        "Ox",
        "Tiger",
        "Rabbit",
        "Dragon",
        "Snake",
        "Horse",
        "Goat",
        "Monkey",
        "Rooster",
        "Dog",
        "Pig",
    ];
    const insertEmail = async (formData) => {
        const endpoint = `${import.meta.env.VITE_API_URL}/history`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Server responded with ${response.status}: ${errorText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.response) {
                console.error(`Response error: ${error.message}`);
            } else {
                console.error(`Network or other error: ${error.message}`);
            }
            throw error;
        }
    };

    const sendEmail = async (formData) => {
        const endpoint = `${import.meta.env.VITE_API_URL}/email`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    target: "dwh9303@gmail.com",
                    private: false,
                    ...formData,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Server responded with ${response.status}: ${errorText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.response) {
                console.error(`Response error: ${error.message}`);
            } else {
                console.error(`Network or other error: ${error.message}`);
            }
            throw error;
        }
    };

    const patchEmail = async (name, timestamp) => {
        const encodedName = encodeURIComponent(name);
        const encodedTimestamp = encodeURIComponent(timestamp);

        const endpoint = `${
            import.meta.env.VITE_API_URL
        }/history/${encodedName}/${encodedTimestamp}`;

        try {
            const response = await fetch(endpoint, {
                method: "PATCH",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Server responded with ${response.status}: ${errorText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.response) {
                console.error(`Response error: ${error.message}`);
            } else {
                console.error(`Network or other error: ${error.message}`);
            }
            throw error;
        }
    };

    const filterBadWords = (formData) => {
        const filter = new Filter();
        const filteredForm = formData;
        filteredForm.name = filter.clean(formData.name);
        filteredForm.target_name = filter.clean(formData.target_name);
        return filteredForm;
    };

    const handleChange = (e) => {
        setErrors({});
        formData[e.target.id] = e.target.value;
        setFormData(formData);
    };

    const handleSwitchChange = (e) => {
        formData["private"] = e;
        setFormData(formData);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        let formIsValid = true;
        const errors = {};

        // Email validation
        if (!formData.target_email || !validateEmail(formData.target_email)) {
            formIsValid = false;
            errors.target_email = true;
        }

        // Password validation
        if (!formData.name) {
            formIsValid = false;
            errors.name = true;
        }

        if (!formData.target_name) {
            formIsValid = false;
            errors.target_name = true;
        }

        setErrors(errors);
        return formIsValid;
    };

    return (
        <>
            <div id="new-email-form" className="scroll-mt-48 w-full">
                <div className="flex w-full items-center justify-center rounded-xl py-8 border-dashed border-2 border-slate-700 mb-16 -sm:border-none">
                    <Button
                        type="button"
                        className="w-64 h-12"
                        color="red"
                        onClick={() => setIsOpen(true)}
                    >
                        <PlusIcon />
                        New email
                    </Button>
                </div>
            </div>
            <Dialog open={isOpen} onClose={setIsOpen} size="3xl">
                <DialogTitle>New email details</DialogTitle>
                <DialogDescription>
                    Brighten someone&apos;s day today! Fill out all info below
                    to send the free email.
                </DialogDescription>
                <DialogBody>
                    <Fieldset>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <Label>Your name</Label>
                                    <Input
                                        placeholder="John Doe"
                                        name="name"
                                        id="name"
                                        invalid={errors.name === true}
                                        onChange={handleChange}
                                    />
                                </Field>
                                <Field>
                                    <Label>Recipient name</Label>
                                    <Input
                                        placeholder="Jane Doe"
                                        name="target_name"
                                        id="target_name"
                                        invalid={errors.target_name === true}
                                        onChange={handleChange}
                                    />
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <Label>Recipient email</Label>
                                    <Input
                                        placeholder="darenhua@happyyearofthedragon.com"
                                        name="target_email"
                                        id="target_email"
                                        type="email"
                                        invalid={errors.target_email === true}
                                        onChange={handleChange}
                                    />

                                    <Description>
                                        Email addresses will not be shown
                                        publicly.
                                    </Description>
                                </Field>
                                <Field>
                                    <Label>Recipient Zodiac</Label>
                                    <Select
                                        name="target_zodiac"
                                        id="target_zodiac"
                                        // className="my-3"
                                        defaultValue="Unknown"
                                        onChange={handleChange}
                                    >
                                        {zodiacs.map((zodiac) => (
                                            <option value={zodiac} key={zodiac}>
                                                {zodiac}
                                            </option>
                                        ))}
                                    </Select>
                                    <Description>
                                        Zodiac is based on birth year.{" "}
                                        <Link
                                            target="_blank"
                                            href="https://www.astrosofa.com/horoscope/calculate-chinese-zodiac-sign"
                                        >
                                            See more.
                                        </Link>
                                    </Description>
                                </Field>
                            </div>

                            <SwitchField>
                                <Label>Make private</Label>
                                <Description>
                                    If you do not want others to see your name,
                                    recipient name, and time sent, then private
                                    will hide it from the table. Zodiac will
                                    still be shown. Your email will still be
                                    sent if you enable private.
                                </Description>
                                <Switch
                                    name="private"
                                    color="green"
                                    id="private"
                                    onChange={handleSwitchChange}
                                    defaultChecked
                                />
                            </SwitchField>
                        </FieldGroup>
                    </Fieldset>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            if (!validateForm()) return;
                            setIsOpen(false);
                            let reqBody = formData;
                            if (!formData.private)
                                reqBody = filterBadWords(formData);
                            const { timestamp } = await insertEmail(reqBody);
                            handlePending(true);
                            await new Promise((resolve) =>
                                setTimeout(() => resolve(true), 500)
                            );
                            await sendEmail(reqBody);
                            await patchEmail(formData.name, timestamp);
                            handlePending(false);
                        }}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
