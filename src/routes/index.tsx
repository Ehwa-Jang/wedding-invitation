import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gallery, images } from "@/lib/invitation-images";
import { InvitationArtwork, InvitationCalendar } from "@/components/invitation-artwork";
import { invitation } from "@/lib/invitation-content";

const when = `${invitation.date.year}년 ${invitation.date.month}월 ${invitation.date.day}일 일요일 ${invitation.date.time}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${invitation.groom} ♥ ${invitation.bride} | 결혼식에 초대합니다` },
      { name: "description", content: `${when}, ${invitation.venue}. ${invitation.groom}과 ${invitation.bride}의 결혼식에 초대합니다.` },
      { property: "og:title", content: `${invitation.groom} ♥ ${invitation.bride} | 결혼식에 초대합니다` },
      { property: "og:description", content: `${when} · ${invitation.venue}` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const accountNames = ["신랑", "신부", "신랑 아버지", "신부 아버지", "신랑 어머니", "신부 어머니"];

function Index() {
  const [expanded, setExpanded] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const audio = useRef<HTMLAudioElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef(0);
  const photoTrigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const shiftPhoto = (direction: number) => setPhoto(current => current === null ? null : (current + direction + gallery.length) % gallery.length);
  const closePhoto = () => { setPhoto(null); photoTrigger.current?.focus(); };

  useEffect(() => {
    if (photo === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowRight") shiftPhoto(1);
      if (event.key === "ArrowLeft") shiftPhoto(-1);
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
        const active = controls.indexOf(document.activeElement as HTMLButtonElement);
        const next = controls[(active + (event.shiftKey ? -1 : 1) + controls.length) % controls.length];
        event.preventDefault(); next?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [photo]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };
  const copy = async (value: string, message: string) => {
    try { await navigator.clipboard.writeText(value); notify(message); }
    catch { notify("복사하지 못했습니다. 다시 시도해 주세요."); }
  };
  const toggleMusic = async () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); }
    else { try { await audio.current.play(); setPlaying(true); } catch { notify("음악을 재생하지 못했습니다. 다시 시도해 주세요."); } }
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${invitation.groom}, ${invitation.bride} 결혼합니다.`, text: when, url: window.location.href }); }
      catch (error) { if (!(error instanceof Error && error.name === "AbortError")) notify("공유하지 못했습니다. 다시 시도해 주세요."); }
    } else await copy(window.location.href, "청첩장 링크가 복사되었습니다. 카카오톡에 붙여넣어 주세요.");
  };

  return (
    <>
      {invitation.musicSrc && <><audio ref={audio} src={invitation.musicSrc} loop preload="none" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <Button variant="music" onClick={toggleMusic} aria-label={playing ? "배경음악 정지" : "배경음악 재생"} title={playing ? "배경음악 정지" : "배경음악 재생"} aria-pressed={playing}>
        {playing ? <Volume2 /> : <VolumeX />}
      </Button></>}
      <main className="invitation">
        <h1 className="sr-only">{invitation.groom}과 {invitation.bride}의 결혼식에 초대합니다</h1>
        <InvitationArtwork />
        <section className="gallery" aria-label="웨딩 사진">
          <div className="photo-grid">
            {gallery.slice(0, expanded ? 15 : 9).map((src, index) => (
              <Button key={src} variant="photo" aria-label={`웨딩 사진 ${index + 1} 확대`} onClick={event => { photoTrigger.current = event.currentTarget; setPhoto(index); }}>
                <img src={src} alt={`${invitation.groom}과 ${invitation.bride}의 웨딩 사진 ${index + 1}`} loading="lazy" />
              </Button>
            ))}
          </div>
          <div className="gallery-more"><Button variant="invitation" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}>{expanded ? "접기" : "더보기"}</Button></div>
        </section>
        <InvitationCalendar />
        <section className="location" aria-labelledby="location-title">
          <div className="location-heading">
            <p className="eyebrow">Location</p><h2 className="section-title" id="location-title">오시는 길</h2>
            <p className="venue-name">{invitation.venue}</p>
            {invitation.address && <><p className="venue-address">{invitation.address}</p>
            <Button variant="invitationPink" onClick={() => copy(invitation.address, "주소가 복사되었습니다 ✓")}>주소 복사하기</Button></>}
          </div>
          <a href={`https://map.naver.com/p/search/${encodeURIComponent(invitation.venue)}`} target="_blank" rel="noopener noreferrer" aria-label={`네이버 지도에서 ${invitation.venue} 보기`}>
            <img className="location-map" src={images.location} alt={`${invitation.venue} 위치 지도`} loading="lazy" />
          </a>
          {invitation.transport.length > 0 && <div className="transport">
            {invitation.transport.map(group => <div className="transport-group" key={group.title}><p><strong>{group.title}</strong></p><p>{group.lines.map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</p></div>)}
          </div>}
        </section>
        <section className="account" aria-labelledby="account-title">
          <p className="eyebrow">Gift</p><h2 className="section-title" id="account-title">마음 전하실 곳</h2>
          <div className="account-grid">
            {accountNames.map(name => (
              <div className="account-item" key={name}>
                <div className="account-info"><p>{name}</p><p>{invitation.bank} {invitation.accountNumber}</p><Button variant="account" aria-label={`${name} 계좌번호 복사하기`} onClick={() => copy(`${invitation.bank} ${invitation.accountNumber}`, "계좌번호가 복사되었습니다 ✓")}>복사하기</Button></div>
              </div>
            ))}
          </div>
        </section>
        <section className="share" aria-label="청첩장 공유">
          <div className="share-buttons"><Button variant="invitation" onClick={() => copy(window.location.href, "청첩장 링크가 복사되었습니다 ✓")}>결혼소식 소문내기</Button><Button variant="invitationKakao" onClick={share}>카톡으로 소문내기</Button></div>
        </section>
        <footer className="invitation-footer">© {invitation.groomEnglish} &amp; {invitation.brideEnglish}</footer>
      </main>
      {photo !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`웨딩 사진 ${photo + 1} / 15`} onClick={closePhoto} onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? 0; }} onTouchEnd={event => { const dx = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(dx) > 40) shiftPhoto(dx < 0 ? 1 : -1); }}>
        <img className="lightbox-image" src={gallery[photo]} alt={`웨딩 사진 ${photo + 1}`} onClick={event => event.stopPropagation()} />
        <Button ref={closeButton} variant="lightbox" className="lightbox-close" aria-label="사진 닫기" onClick={event => { event.stopPropagation(); closePhoto(); }}><X /></Button>
        <Button variant="lightbox" className="lightbox-prev" aria-label="이전 사진" onClick={event => { event.stopPropagation(); shiftPhoto(-1); }}><ChevronLeft /></Button>
        <Button variant="lightbox" className="lightbox-next" aria-label="다음 사진" onClick={event => { event.stopPropagation(); shiftPhoto(1); }}><ChevronRight /></Button>
      </div>}
      {toast && <div className="copy-toast" role="status">{toast}</div>}
    </>
  );
}
