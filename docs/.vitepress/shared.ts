/**
 * Copyright (c) 2025 taskylizard. Apache License 2.0.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { DefaultTheme } from 'vitepress'
// @unocss-include

export const meta = {
    name: 'MyFMHY',
    description: 'Your own super cute free media & tools collection ;3',
    hostname: 'https://edit-mocha-one.vercel.app', // change this later if you add a custom domain
    keywords: ['stream', 'movies', 'gaming', 'reading', 'anime', 'cute', 'nya'],
    build: {
        api: true,
        nsfw: true
    }
}

export const excluded = [
    'readme.md',
    'single-page',
    'feedback.md',
    'index.md',
    'sandbox.md',
    'startpage.md'
]

const safeEnv = (key: string) => typeof process !== 'undefined' ? process.env?.[key] : undefined

if (safeEnv('FMHY_BUILD_NSFW') === 'false') {
    meta.build.nsfw = false
}
if (safeEnv('FMHY_BUILD_API') === 'false') {
    meta.build.api = false
}

const formatCommitRef = (commitRef: string) =>
    `<a href="https://github.com/JasperSoosaar25/edit/commit/${commitRef}">${commitRef.slice(0, 8)}</a>`

const cfStart = safeEnv('CF_PAGES_COMMIT_SHA')
const commitStart = safeEnv('COMMIT_REF')

export const commitRef =
    safeEnv('CF_PAGES') && cfStart
        ? formatCommitRef(cfStart)
        : commitStart
            ? formatCommitRef(commitStart)
            : 'dev'

export const feedback = `<a href="/feedback" class="feedback-footer">Made with ❤ nya~ :3</a>`

// === CUTE SOCIAL LINKS ===
export const socialLinks: DefaultTheme.SocialLink[] = [
    { 
        icon: 'github', 
        link: 'https://github.com/JasperSoosaar25/edit' 
    },
    { 
        icon: 'discord', 
        link: 'https://discord.gg/xCHFq2gk' 
    },
    {
        icon: 'reddit',
        link: 'https://reddit.com/r/FREEMEDIAHECKYEAH'
    }
]

// === CUTE NAVIGATION ===
export const nav: DefaultTheme.NavItem[] = [
    { text: '📑 Changelog ;3', link: '/posts/changelog-sites' },
    { text: '📖 Glossary nya~', link: 'https://rentry.org/The-Piracy-Glossary' },
    {
        text: '💾 Backups :3',
        link: '/other/backups'
    },
    {
        text: '🌱 Ecosystem ;3',
        items: [
            { text: '🌐 Search nya~', link: '/posts/search' },
            { text: '❓ FAQs :3', link: '/other/FAQ' },
            { text: '🔖 Bookmarks', link: 'https://github.com/fmhy/bookmarks' },
            { text: '✅ SafeGuard', link: 'https://github.com/fmhy/FMHY-SafeGuard' },
            { text: '🚀 Startpage ;3', link: 'https://fmhy.net/startpage' },
            { text: '✴️ rss.fmhy', link: 'https://rss.fmhy.bid/' },
            { text: '🔎 SearXNG', link: 'https://searx.fmhy.net/' },
            {
                text: '💡 Site Hunting ;3',
                link: 'https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/find-new-sites/'
            },
            {
                text: '😇 SFW FMHY',
                link: 'https://fmhy.xyz/'
            },
            {
                text: '🏠 Selfhosting nya~',
                link: '/other/selfhosting'
            },
            { text: '🏞 Wallpapers :3', link: '/other/wallpapers' },
            { text: '💙 Feedback ;3', link: '/feedback' }
        ]
    }
]

// === CUTE SIDEBAR ===
export const sidebar: DefaultTheme.Sidebar | DefaultTheme.NavItemWithLink[] = [
    {
        text: '<span class="i-twemoji:books"></span> Beginners Guide :3',
        link: '/beginners-guide'
    },
    {
        text: '<span class="i-twemoji:newspaper"></span> Posts nya~',
        link: '/posts'
    },
    {
        text: '<span class="i-twemoji:light-bulb"></span> Contribute ;3',
        link: '/other/contributing'
    },
    {
        text: 'Wiki',
        collapsed: false,
        items: [
            {
                text: '<span class="i-twemoji:name-badge"></span> Adblocking / Privacy :3',
                link: '/privacy'
            },
            {
                text: '<span class="i-twemoji:robot"></span> Artificial Intelligence ;3',
                link: '/ai'
            },
            {
                text: '<span class="i-twemoji:television"></span> Movies / TV / Anime :3',
                link: '/video'
            },
            {
                text: '<span class="i-twemoji:musical-note"></span> Music / Podcasts :3',
                link: '/audio'
            },
            {
                text: '<span class="i-twemoji:video-game"></span> Gaming / Emulation ;3',
                link: '/gaming'
            },
            {
                text: '<span class="i-twemoji:green-book"></span> Books / Comics :3',
                link: '/reading'
            },
            {
                text: '<span class="i-twemoji:floppy-disk"></span> Downloading nya~',
                link: '/downloading'
            },
            {
                text: '<span class="i-twemoji:cyclone"></span> Torrenting ;3',
                link: '/torrenting'
            },
            {
                text: '<span class="i-twemoji:brain"></span> Educational :3',
                link: '/educational'
            },
            {
                text: '<span class="i-twemoji:mobile-phone"></span> Android / iOS ;3',
                link: '/mobile'
            },
            {
                text: '<span class="i-twemoji:penguin"></span> Linux / macOS nya~',
                link: '/linux-macos'
            },
            {
                text: '<span class="i-twemoji:globe-showing-asia-australia"></span> Non-English :3',
                link: '/non-english'
            },
            {
                text: '<span class="i-twemoji:file-folder"></span> Miscellaneous ;3',
                link: '/misc'
            }
        ]
    },
    {
        text: 'Tools',
        collapsed: false,
        items: [
            { text: '<span class="i-twemoji:laptop"></span> System Tools :3', link: '/system-tools' },
            { text: '<span class="i-twemoji:card-file-box"></span> File Tools ;3', link: '/file-tools' },
            { text: '<span class="i-twemoji:paperclip"></span> Internet Tools nya~', link: '/internet-tools' },
            { text: '<span class="i-twemoji:left-speech-bubble"></span> Social Media Tools :3', link: '/social-media-tools' },
            { text: '<span class="i-twemoji:memo"></span> Text Tools ;3', link: '/text-tools' },
            { text: '<span class="i-twemoji:alien-monster"></span> Gaming Tools :3', link: '/gaming-tools' },
            { text: '<span class="i-twemoji:camera"></span> Image Tools nya~', link: '/image-tools' },
            { text: '<span class="i-twemoji:videocassette"></span> Video Tools ;3', link: '/video-tools' },
            { text: '<span class="i-twemoji:speaker-high-volume"></span> Audio Tools :3', link: '/audio#audio-tools' },
            { text: '<span class="i-twemoji:red-apple"></span> Educational Tools ;3', link: '/educational#educational-tools' },
            { text: '<span class="i-twemoji:man-technologist"></span> Developer Tools :3', link: '/developer-tools' }
        ]
    },
    {
        text: 'More',
        collapsed: true,
        items: [
            meta.build.nsfw
                ? {
                    text: '<span class="i-twemoji:no-one-under-eighteen"></span> NSFW ;3',
                    link: 'https://rentry.org/NSFW-Checkpoint'
                }
                : {},
            {
                text: '<span class="i-twemoji:warning"></span> Unsafe Sites :3',
                link: '/unsafe'
            },
            {
                text: '<span class="i-twemoji:package"></span> Storage nya~',
                link: '/storage'
            }
        ]
    }
]
