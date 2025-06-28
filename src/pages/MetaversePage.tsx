import React, { useEffect, useRef } from 'react';
import './MetaversePage.css';

declare global {
  interface Window {
    createUnityInstance: any;
  }
}

const MetaversePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const progressBarFullRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLDivElement>(null);
  const warningBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const loadingBar = loadingBarRef.current;
    const progressBarFull = progressBarFullRef.current;
    const fullscreenButton = fullscreenButtonRef.current;
    const warningBanner = warningBannerRef.current;

    if (!container || !canvas || !loadingBar || !progressBarFull || !fullscreenButton || !warningBanner) {
      return;
    }

    // Shows a temporary message banner/ribbon for a few seconds, or
    // a permanent error message on top of the canvas if type=='error'.
    // If type=='warning', a yellow highlight color is used.
    const unityShowBanner = (msg: string, type: string) => {
      const updateBannerVisibility = () => {
        if (warningBanner) {
          warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
      };
      
      const div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      
      if (type === 'error') {
        div.style.cssText = 'background: red; padding: 10px;';
      } else {
        if (type === 'warning') {
          div.style.cssText = 'background: yellow; padding: 10px;';
        }
        setTimeout(() => {
          if (warningBanner.contains(div)) {
            warningBanner.removeChild(div);
            updateBannerVisibility();
          }
        }, 5000);
      }
      updateBannerVisibility();
    };

    const buildUrl = "Build";
    const loaderUrl = buildUrl + "/metaverse.loader.js";
    const config = {
      dataUrl: buildUrl + "/metaverse.data",
      frameworkUrl: buildUrl + "/metaverse.framework.js",
      codeUrl: buildUrl + "/metaverse.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "UiseongPanorama",
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    // Mobile device detection
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";
      canvas.className = "unity-mobile";
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen
      canvas.style.width = "1920px";
      canvas.style.height = "1080px";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      if (window.createUnityInstance) {
        window.createUnityInstance(canvas, config, (progress: number) => {
          if (progressBarFull) {
            progressBarFull.style.width = 100 * progress + "%";
          }
        }).then((unityInstance: any) => {
          if (loadingBar) {
            loadingBar.style.display = "none";
          }
          if (fullscreenButton) {
            fullscreenButton.onclick = () => {
              unityInstance.SetFullscreen(1);
            };
          }
        }).catch((message: string) => {
          alert(message);
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div id="unity-container" ref={containerRef} className="unity-desktop">
        <canvas 
          id="unity-canvas" 
          ref={canvasRef}
          width={1920} 
          height={1080} 
          tabIndex={-1}
        />
        <div id="unity-loading-bar" ref={loadingBarRef}>
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full" ref={progressBarFullRef}></div>
          </div>
        </div>
        <div id="unity-warning" ref={warningBannerRef}></div>
        <div id="unity-footer">
          <div id="unity-webgl-logo"></div>
          <div id="unity-fullscreen-button" ref={fullscreenButtonRef}></div>
          <div id="unity-build-title">UiseongPanorama</div>
        </div>
      </div>
    </div>
  );
};

export default MetaversePage; 