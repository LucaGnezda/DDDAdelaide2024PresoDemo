// @ts-nocheck

"use strict";

class AnimatorService {
    static pageOutro(fromPage, usingTransition, duration) {
        let oneQtrDuration = duration / 4;
        let halfDuration = duration / 2;
        let threeQtrDuration = (3 * duration) / 4;

        switch (usingTransition) {
            case PageTransition.SlideLeft:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitLeft();
                fromPage.withoutFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.SlideRight:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitRight();
                fromPage.withoutFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.SlideUp:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitTop();
                fromPage.withoutFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.SlideDown:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitBottom();
                fromPage.withoutFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.FadeSlideLeft:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitLeft();
                fromPage.withFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.FadeSlideRight:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitRight();
                fromPage.withFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.FadeSlideUp:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitTop();
                fromPage.withFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.FadeSlideDown:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.exitBottom();
                fromPage.withFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.Fade:
                fromPage.usingTransition(halfDuration, "ease-in", 0);
                fromPage.inPlace();
                fromPage.withFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
                break;

            case PageTransition.ZoomIn:
                fromPage.usingTransition(threeQtrDuration, "ease-in", 0);
                fromPage.inPlace();
                fromPage.withFadeOut();
                fromPage.withZoomInExit();
                fromPage.hide();
                break;

            case PageTransition.ZoomOut:
                fromPage.usingTransition(threeQtrDuration, "ease-in", 0);
                fromPage.inPlace();
                fromPage.withFadeOut();
                fromPage.withZoomOutExit();
                fromPage.hide();
                break;
            
            case PageTransition.None:
            default:
                fromPage.usingTransition(0, "linear", 0);
                fromPage.inPlace();
                fromPage.withoutFadeOut();
                fromPage.withoutZoom();
                fromPage.hide();
        }
    }

    static pageIntro(toPage, usingTransition, duration) {
        let oneQtrDuration = duration / 4;
        let halfDuration = duration / 2;
        let threeQtrDuration = (3 * duration) / 4;

        switch (usingTransition) {
            case PageTransition.SlideLeft:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterRight();
                toPage.withoutFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.SlideRight:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterLeft();
                toPage.withoutFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.SlideUp:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterBottom();
                toPage.withoutFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.SlideDown:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterTop();
                toPage.withoutFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;
            
            case PageTransition.FadeSlideLeft:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterRight();
                toPage.withFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.FadeSlideRight:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterLeft();
                toPage.withFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.FadeSlideUp:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterBottom();
                toPage.withFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.FadeSlideDown:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.enterTop();
                toPage.withFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.Fade:
                toPage.usingTransition(halfDuration, "ease-out", halfDuration);
                toPage.inPlace();
                toPage.withFadeIn();
                toPage.withoutZoom();
                toPage.show();
                break;

            case PageTransition.ZoomIn:
                toPage.usingTransition(threeQtrDuration, "ease-out", oneQtrDuration);
                toPage.inPlace();
                toPage.withFadeIn();
                toPage.withZoomInEntry();
                toPage.show();
                break;

            case PageTransition.ZoomOut:
                toPage.usingTransition(threeQtrDuration, "ease-out", oneQtrDuration);
                toPage.inPlace();
                toPage.withFadeIn();
                toPage.withZoomOutEntry();
                toPage.show();
                break;
            
            case PageTransition.None:
            default:
                toPage.usingTransition(0, "linear", 0);
                toPage.inPlace();
                toPage.withoutFadeIn();
                toPage.withoutZoom();
                toPage.show();
        }
    }

    static transitionBackground(currentBG, toBG, toX, toY, toTransformer, usingTransition, duration) {
        toBG.usingContentPosition(toX, toY);
        toBG.usingTransformationClass(toTransformer);

        if (currentBG == toBG) {
            toBG.usingTransition(duration, "ease-in-out", 0);
        } else {
            switch (usingTransition) {
                case PageTransition.SlideLeft:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitLeft();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterRight();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;
    
                case PageTransition.SlideRight:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitRight();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterLeft();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.SlideUp:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitTop();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterBottom();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.SlideDown:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitBottom();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterTop();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideLeft:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitLeft();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterRight();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;
    
                case PageTransition.FadeSlideRight:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitRight();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterLeft();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideUp:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitTop();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterBottom();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideDown:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.exitBottom();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.enterTop();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.Fade:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.ZoomIn:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withZoomInExit();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withZoomInEntry();
                    toBG.show();
                    break;

                case PageTransition.ZoomOut:
                    currentBG.usingTransition(duration, "ease-in-out", 0);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withZoomOutExit();
                    currentBG.hide();
                    toBG.usingTransition(duration, "ease-in-out", 0);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withZoomOutEntry();
                    toBG.show();
                    break;
                
                case PageTransition.None:
                default:
                    currentBG.usingTransition(0, "linear", 0);
                    currentBG.inPlace();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.usingTransition(0, "linear", 0);
                    toBG.inPlace();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
            }
        }
    }
        
    static transitionPageOverlay(action, page, duration) {
        let halfDuration = duration / 2;
        
        switch (action) {
            case 'open':
                page.disableAnimation("pagePrimary");
                page.usingOverlayTransition(halfDuration, "ease-in", 0, halfDuration, "ease-out", 0);
                page.enterBottom('pageOverlay');
                page.withFadeIn('pageOverlay');
                page.show('pageOverlay');
                page.fadeTo('pagePrimary', 50);
                page.overlayState = action;
                break;
            case 'close':
                page.enableAnimation("pagePrimary");
                page.usingOverlayTransition(halfDuration, "ease-out", 0 , halfDuration, "ease-in", 0);
                page.exitBottom('pageOverlay');
                page.withFadeOut('pageOverlay');
                page.hide('pageOverlay');
                page.fadeTo('pagePrimary', 100);
                page.overlayState = action;
                break;
        }
    }
}