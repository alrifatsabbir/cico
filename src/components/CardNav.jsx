import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation(); // detect route change

  // Collapse menu automatically on route change
  useLayoutEffect(() => {
    if (isExpanded) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const contentHeight = contentEl.scrollHeight;
        const topBar = 60;
        const padding = 16;

        contentEl.removeAttribute("style");
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  const openMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    setIsHamburgerOpen(true);
    setIsExpanded(true);
    tl.play(0);
  };

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    setIsHamburgerOpen(false);
    tl.reverse();
  };

  const toggleMenu = () => {
    if (!isExpanded) openMenu();
    else closeMenu();
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-xl shadow-md relative will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        {/* Top Bar */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            style={{ color: menuColor || "#00ffff" }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </div>

          {/* Logo */}
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <Link to="/#home" className="inline-flex items-center gap-2 no-underline">
              <img src={logo} alt={logoAlt} className="logo h-[45px]" /><span className="text-white font-semibold text-3xl overflow-hidden">CICO Tools</span>
            </Link>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex border-0 bg-[#00fff055] hover:bg-gray-800 text-white rounded-[calc(0.75rem-0.2rem)] px-4 h-full py-3 font-bold cursor-pointe transition-colors duration-300"
          >
            <Link to="/community" style={{ overflow: "hidden" }}>Community</Link>
          </button>
        </div>

        {/* Menu Cards */}
        <div className={`card-nav-content relative left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none "
          } md:flex-row md:items-end md:gap-[12px]`}
        >
          {(items || []).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label text-[16px] md:text-[22px] font-medium">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    to={lnk.path || "#"}
                    aria-label={lnk.ariaLabel}
                    className="nav-card-link inline-flex items-center gap-[4px] no-underline cursor-pointer transition-opacity duration-200 hover:opacity-80 text-[12px] md:text-[15px]"
                    onClick={closeMenu}
                  >
                    <GoArrowUpRight className="shrink-0" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
