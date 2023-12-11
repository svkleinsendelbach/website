import { Link, SocialMediaData } from "kleinsendelbach-website-library";
import { InternalPathKey } from "../types/internal-paths";

export const socialMediaConfig: SocialMediaData<InternalPathKey> = [
    {
        image: ['fab', 'facebook-f'],
        link: Link.external('Facebook', 'https://www.facebook.com/svkleinsendelbach/', true),
        name: 'Facebook',
        title: 'SV Kleinsendelbach e.V.'
    },
    {
        image: ['fab', 'discord'],
        link: Link.external('Discord', 'https://discord.gg/gpJMrajz7q', true),
        name: 'Discord',
        title: 'SV Kleinsendelbach e.V.'
    },
    {
        image: ['fab', 'instagram'],
        link: Link.external('Instagram', 'https://www.instagram.com/sgkleinsendelbachhetzles/', true),
        name: 'Instagram',
        title: 'SG Kleinsendelbach / Hetzles'
    },
    {
        image: {
            darkModeSource: 'assets/images/sg-logo-dark.png',
            lightModeSource: 'assets/images/sg-logo.png'
        },
        link: Link.external('SG Kleinsendelbach / Hetzles', 'http://sg-kh.de', true),
        name: 'Website der SG',
        title: 'SG Kleinsendelbach / Hetzles'
    }
]
