import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-gradient-to-r from-[#3b75c2] via-[#6a85e8] to-[#a470e6] py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white/10 p-10 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d9e6ff]">Stay informed</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Join our newsletter for health tips and appointment alerts.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                Subscribe to receive the latest health news, special offers, and reminders from Medic Queue.
              </p>
            </div>

            <div className="mt-8 md:mt-0">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5">
                <form className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-3xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-200 outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center justify-center rounded-3xl bg-white px-6 py-4 text-sm font-semibold text-[#3b75c2] transition hover:bg-slate-100"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-4 text-xs text-slate-200">
                  Get weekly wellness tips, appointment reminders, and doctor updates straight to your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
