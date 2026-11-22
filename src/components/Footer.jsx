
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
} from "react-icons/bs";

export default function FooterCom() {
  const year = new Date().getFullYear();

  const navigation = [
    {
      title: "Explore",
      links: [
        { label: "Home", to: "/" },
        { label: "Our Story", to: "/our-story" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { label: "Sign the Petition", to: "/sitemap" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: BsFacebook },
    { name: "Instagram", href: "https://instagram.com", icon: BsInstagram },
    { name: "X", href: "https://x.com", icon: BsTwitterX },
  ];

  return (
    <Footer container className="rounded-none border-t-4 border-green-600 bg-gray-950">
      <div className="mx-auto w-full max-w-7xl">

        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 inline-flex items-center gap-2">
              <span className="rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 px-3 py-2 text-xl font-extrabold text-white">
                GC
              </span>

              <span className="text-2xl font-extrabold text-white">
                Ghana <span className="text-green-500">Consumer</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              Empowering consumers, promoting accountability, and advocating
              for healthier, fairer and more informed communities in Ghana.
            </p>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Follow Ghana Consumer
            </p>

            <div className="mt-3 flex gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-green-500 hover:bg-green-600 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition hover:text-green-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Petition call to action */}
        <div className="mb-8 rounded-xl border border-green-800 bg-gray-900 p-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Be part of the change.
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Add your voice to the call for healthier food environments.
            </p>
          </div>

          <Link
            to="/sitemap"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 md:mt-0"
          >
            Sign the Petition
          </Link>
        </div>

        <Footer.Divider className="border-gray-800" />

        <div className="flex flex-col gap-3 py-5 text-center sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            © {year}{" "}
            <Link to="/" className="font-semibold text-white hover:text-green-400">
              Ghana Consumer
            </Link>
            . All rights reserved.
          </p>

          <p className="text-xs font-medium tracking-wide text-gray-500">
            HEALTHIER FOOD. HEALTHIER PEOPLE. HEALTHIER FUTURE.
          </p>
        </div>

      </div>
    </Footer>
  );
}
