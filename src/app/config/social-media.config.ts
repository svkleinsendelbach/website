import { Link, SocialMediaItem } from "kleinsendelbach-website-library";

export const socialMediaConfig: (SocialMediaItem & { imageSrc: string })[] = [
    {
        image: ['fab', 'facebook-f'],
        imageSrc: 'assets/images/facebook-logo.png',
        link: Link.external('Facebook', 'https://www.facebook.com/svkleinsendelbach/', true),
        name: 'Facebook',
        title: 'SV Kleinsendelbach e.V.'
    },
    {
        image: ['fab', 'discord'],
        imageSrc: 'assets/images/discord-logo.png',
        link: Link.external('Discord', 'https://discord.gg/gpJMrajz7q', true),
        name: 'Discord',
        title: 'SV Kleinsendelbach e.V.'
    },
    {
        image: ['fab', 'instagram'],
        imageSrc: 'assets/images/instagram-logo.png',
        link: Link.external('Instagram', 'https://www.instagram.com/sgkleinsendelbachhetzles/', true),
        name: 'Instagram',
        title: 'SG Kleinsendelbach / Hetzles'
    },
    {
        image: {
            darkModeSource: 'assets/images/sg-logo-dark.png',
            lightModeSource: 'assets/images/sg-logo.png'
        },
        imageSrc: 'assets/images/sg-logo.png',
        link: Link.external('SG Kleinsendelbach / Hetzles', 'http://sg-kh.de', true),
        name: 'Website der SG',
        title: 'SG Kleinsendelbach / Hetzles'
    }
]
