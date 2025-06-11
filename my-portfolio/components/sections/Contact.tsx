// components/sections/Contact.tsx
'use client';

import styled from 'styled-components';
import Image from 'next/image';

const FooterWrapper = styled.footer`
  width: 100%;
  background: #ffffff;
  color: #000;
  padding: 4rem 0;
  margin-left: -50vw;
  margin-right: -50vw;

  .panel-inner { background: transparent; padding: 0; }

  @media (max-width: 640px) {
    margin-left: 0;
    margin-right: 0;
  }

  .grid { gap: 2rem; }
  @media (max-width: 640px) {
    .grid { grid-template-columns: repeat(1,minmax(0,1fr)); }
  }
`;

export default function Contact() {
  return (
    <FooterWrapper id="contact">
        {/* original footer markup pasted here unchanged (omitted for brevity) */}
        <div className="panel-inner">
          <footer className="bg-white">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-8 px-10 py-6 lg:py-8 md:grid-cols-4">
                {/* Column 1: Menu */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Menu
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li>
                      <a href="#Home" className="hover:underline">Home</a>
                    </li>
                    <li>
                      <a href="#Home" className="hover:underline">AboutMe</a>
                    </li>
                    <li>
                      <a href="#skills" className="hover:underline">Skills</a>
                    </li>
                    <li>
                      <a href="#experience" className="hover:underline">Work Experience</a>
                    </li>
                    <li>
                      <a href="#projects" className="hover:underline">Projects</a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Socials (all as anchor tags) */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Socials
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://www.linkedin.com/in/rishi-ganji/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>LinkedIn</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          />
                          <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                        </svg>
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://github.com/Rishi2772001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>GitHub</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://www.instagram.com/_t.i.g.e.r_27?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>Instagram</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Get in Touch */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Get in Touch
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li>+1(530)-715-9773</li>
                    <li>rishiganjik8@gmail.com</li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      <span>California</span>
                    </li>

                  </ul>
                </div>

                {/* Column 4: Profile Image (full width of its column) */}
                <div className="flex justify-center items-center">
                  <Image
                    src="/profile.jpeg"
                    alt="Rishi Ganji"
                    
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              {/* Copyright at bottom, centered */}
              <div className="w-full text-center py-4">
                <span className="text-sm text-gray-600 font-michroma">
                  © 2025 Rishi Ganji. All Rights Reserved.
                </span>
              </div>
            </div>
          </footer>
        </div>

      </FooterWrapper>
  );
}
