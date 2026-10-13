import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import media from "@/assets/invitation-media.json";
import location from "@/assets/location.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "엄태희 ♥ 김아란 | 결혼식에 초대합니다" },
      { name: "description", content: "2026년 3월 22일 일요일 오후 12시 30분, 라시따시어터 1층 그랜드볼룸. 엄태희와 김아란의 결혼식에 초대합니다." },
      { property: "og:title", content: "엄태희 ♥ 김아란 | 결혼식에 초대합니다" },
      { property: "og:description", content: "2026년 3월 22일 일요일 오후 12시 30분 · 라시따시어터 1층 그랜드볼룸" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const artwork = [
  ["2_main1.jpg", "엄태희와 김아란의 결혼식에 초대합니다. 2026년 3월 22일 일요일 오후 12시 30분, 라시따시어터 1층 그랜드볼룸."],
  ["3_main2.jpg", "우리의 결혼식에 초대합니다. 귀한 당신의 진심을 더해 주시면 더 없는 기쁨이겠습니다."],
  ["4_groom_fam.jpg", "신랑 엄태희와 가족의 인사"],
  ["5_bride_fam.jpg", "신부 김아란과 가족의 인사"],
  ["6_loveletter1.jpg", "신랑이 신부에게 전하는 러브레터"],
  ["7_loveletter2.jpg", "신부가 신랑에게 전하는 러브레터"],
] as const;
const gallery = Array.from({ length: 15 }, (_, index) => media[`${index + 1}.jpg` as keyof typeof media]);
const accountNames = ["신랑", "신부", "신랑부", "신부부", "신랑모", "신부모"];

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
      try { await navigator.share({ title: "엄태희, 김아란 결혼합니다.", text: "2026년 3월 22일 일요일 오후 12시 30분", url: window.location.href }); }
      catch (error) { if (!(error instanceof Error && error.name === "AbortError")) notify("공유하지 못했습니다. 다시 시도해 주세요."); }
    } else await copy(window.location.href, "청첩장 링크가 복사되었습니다. 카카오톡에 붙여넣어 주세요.");
  };

  return (
    <>
      <audio ref={audio} src={media["music.mp3"].url} loop preload="none" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <Button variant="music" onClick={toggleMusic} aria-label={playing ? "배경음악 정지" : "배경음악 재생"} title={playing ? "배경음악 정지" : "배경음악 재생"} aria-pressed={playing}>
        {playing ? <Volume2 /> : <VolumeX />}
      </Button>
      <main className="invitation">
        <h1 className="sr-only">엄태희와 김아란의 결혼식에 초대합니다</h1>
        {artwork.map(([name, alt], index) => {
          const asset = media[name];
          return <img key={name} className="invitation-art" src={asset.url} alt={alt} width={asset.dimensions?.[0]} height={asset.dimensions?.[1]} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />;
        })}
        <section className="invitation-gallery" aria-label="웨딩 사진">
          <div className="photo-grid">
            {gallery.slice(0, expanded ? 15 : 9).map((asset, index) => (
              <Button key={asset.url} variant="photo" aria-label={`웨딩 사진 ${index + 1} 확대`} onClick={event => { photoTrigger.current = event.currentTarget; setPhoto(index); }}>
                <img src={asset.url} alt={`엄태희와 김아란의 웨딩 사진 ${index + 1}`} loading="lazy" />
              </Button>
            ))}
          </div>
          <div className="gallery-more"><Button variant="invitation" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}>{expanded ? "접기" : "더보기"}</Button></div>
        </section>
        <img className="invitation-art" src={media["8_calendar.jpg"].url} width={media["8_calendar.jpg"].dimensions?.[0]} height={media["8_calendar.jpg"].dimensions?.[1]} alt="2026년 3월 22일 일요일 오후 12시 30분 결혼식 달력" loading="lazy" />
        <section className="location-section" aria-labelledby="location-title">
          <div className="location-heading">
            <h2 className="section-title" id="location-title">오시는 길</h2>
            <p className="venue-name">라시따시어터 1층 그랜드볼룸</p>
            <p className="venue-address">서울 서초구 매헌로 16</p>
            <Button variant="invitationPink" onClick={() => copy("서울 서초구 매헌로 16", "주소가 복사되었습니다 ✓")}>주소 복사하기</Button>
          </div>
          <a href="https://map.naver.com/p/search/라시따시어터" target="_blank" rel="noopener noreferrer" aria-label="네이버 지도에서 라시따시어터 보기">
            <img className="location-map" src={location.url} alt="서울 서초구 매헌로 16, 라시따시어터 위치 지도" loading="lazy" />
          </a>
          <div className="transport">
            <div className="transport-group"><p><strong>🚃 지하철 이용 시</strong></p><p>지하철 1호선, 수인분당선, KTX<br />수원역 3번 출구에서 도보 8분<br />타임빌라스수원(구 롯데몰) 맞은 편</p></div>
            <div className="transport-group"><p><strong>🚌 버스 이용 시</strong></p><p>수원역 환승센터(1승강장)하차<br />평동 동남아파트 하차</p></div>
            <div className="transport-group"><p><strong>🚗 주차 안내</strong></p><p>웨딩홀 지하주차장 이용</p></div>
          </div>
        </section>
        <section className="account-section" aria-labelledby="account-title">
          <hr /><h2 className="section-title" id="account-title">마음 전하실 곳</h2>
          <div className="account-grid">
            {accountNames.map((name, index) => (
              <div className="account-item" key={name}>
                <img src={media[`account-${index}.svg` as keyof typeof media].url} alt="" loading="lazy" />
                <div className="account-info"><p>카카오뱅크 123-12-12345</p><p>{name}</p><Button variant="account" aria-label={`${name} 계좌번호 복사하기`} onClick={() => copy("카카오뱅크 123-12-12345", "계좌번호가 복사되었습니다 ✓")}>복사하기</Button></div>
              </div>
            ))}
          </div>
        </section>
        <section className="share-section" aria-label="청첩장 공유">
          <div className="share-buttons"><Button variant="invitation" onClick={() => copy(window.location.href, "청첩장 링크가 복사되었습니다 ✓")}>결혼소식 소문내기</Button><Button variant="invitationKakao" onClick={share}>카톡으로 소문내기</Button></div>
        </section>
        <footer className="invitation-footer">ⓒweddingpeach</footer>
      </main>
      {photo !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`웨딩 사진 ${photo + 1} / 15`} onClick={closePhoto} onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? 0; }} onTouchEnd={event => { const dx = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(dx) > 40) shiftPhoto(dx < 0 ? 1 : -1); }}>
        <img className="lightbox-image" src={gallery[photo]?.url} alt={`웨딩 사진 ${photo + 1}`} onClick={event => event.stopPropagation()} />
        <Button ref={closeButton} variant="lightbox" className="lightbox-close" aria-label="사진 닫기" onClick={event => { event.stopPropagation(); closePhoto(); }}><X /></Button>
        <Button variant="lightbox" className="lightbox-prev" aria-label="이전 사진" onClick={event => { event.stopPropagation(); shiftPhoto(-1); }}><ChevronLeft /></Button>
        <Button variant="lightbox" className="lightbox-next" aria-label="다음 사진" onClick={event => { event.stopPropagation(); shiftPhoto(1); }}><ChevronRight /></Button>
      </div>}
      {toast && <div className="copy-toast" role="status">{toast}</div>}
    </>
  );
}
