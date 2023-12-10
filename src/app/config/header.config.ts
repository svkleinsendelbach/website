import { HeaderData } from "kleinsendelbach-website-library";
import { InternalPath } from "../types/internal-path";

export const headerConfig: HeaderData<InternalPath, InternalPath> = {
    name: 'SV Kleinsendelbach',
    logoSrc: 'assets/images/svk-logo.svg',
    homeLink: 'home',
    items: {
        home: {
            title: 'Home',
            link: 'home'
        }
    },
    sorting: {
        desktop: [
            {
                topItem: 'home',
                subItems: null
            }
        ],
        tablet: [
            {
                topItem: 'home',
                subItems: null
            }
        ],
        mobile: [
            {
                topItem: 'home',
                subItems: null
            }
        ]
    }
}
