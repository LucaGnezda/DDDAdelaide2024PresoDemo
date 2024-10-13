"use strict";

class AnimatorService {
    
    static pageOutro(fromPage, usingTransition, duration) {

        let halfDuration = duration / 2;

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
                fromPage.usingTransition(duration, "ease-in", 0);
                fromPage.inPlace();
                fromPage.withFadeOut();
                fromPage.withZoomInExit();
                fromPage.hide();
                break;

            case PageTransition.ZoomOut:
                fromPage.usingTransition(duration, "ease-in", 0);
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

        let halfDuration = duration / 2;

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
                toPage.usingTransition(duration, "ease-out", 0);
                toPage.inPlace();
                toPage.withFadeIn();
                toPage.withZoomInEntry();
                toPage.show();
                break;

            case PageTransition.ZoomOut:
                toPage.usingTransition(duration, "ease-out", 0);
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

    static transitionBackground(fromPage, toPage, usingTransition, duration) {

        let currentBG = App.backgrounds[fromPage.backgroundId];
        let toBG = App.backgrounds[toPage.backgroundId];

        if (fromPage.backgroundId == toPage.backgroundId) {

            currentBG.contentPosition(toPage.backgroundX, toPage.backgroundY);
            currentBG.transformationClass(toPage.backgroundTransformer);
            currentBG.transitionDuration(duration);

        }
        else {

            switch (usingTransition) {

                case PageTransition.SlideLeft:
                    currentBG.transitionDuration(duration);
                    currentBG.exitLeft();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterRight();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;
    
                case PageTransition.SlideRight:
                    currentBG.transitionDuration(duration);
                    currentBG.exitRight();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterLeft();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.SlideUp:
                    currentBG.transitionDuration(duration);
                    currentBG.exitTop();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterBottom();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.SlideDown:
                    currentBG.transitionDuration(duration);
                    currentBG.exitBottom();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterTop();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideLeft:
                    currentBG.transitionDuration(duration);
                    currentBG.exitLeft();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterRight();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;
    
                case PageTransition.FadeSlideRight:
                    currentBG.transitionDuration(duration);
                    currentBG.exitRight();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterLeft();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideUp:
                    currentBG.transitionDuration(duration);
                    currentBG.exitTop();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterBottom();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.FadeSlideDown:
                    currentBG.transitionDuration(duration);
                    currentBG.exitBottom();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.enterTop();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.Fade:
                    currentBG.transitionDuration(duration);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withoutZoom();
                    toBG.show();
                    break;

                case PageTransition.ZoomIn:
                    currentBG.transitionDuration(duration);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withZoomInExit();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withZoomInEntry();
                    toBG.show();
                    break;

                case PageTransition.ZoomOut:
                    currentBG.transitionDuration(duration);
                    currentBG.inPlace();
                    currentBG.withFadeOut();
                    currentBG.withZoomOutExit();
                    currentBG.hide();
                    toBG.transitionDuration(duration);
                    toBG.inPlace();
                    toBG.withFadeIn();
                    toBG.withZoomOutEntry();
                    toBG.show();
                    break;
                
                case PageTransition.None:
                default:
                    currentBG.transitionDuration(0);
                    currentBG.inPlace();
                    currentBG.withoutFadeOut();
                    currentBG.withoutZoom();
                    currentBG.hide();
                    toBG.transitionDuration(0);
                    toBG.inPlace();
                    toBG.withoutFadeIn();
                    toBG.withoutZoom();
                    toBG.show();

            }
        }

    }

    static swapBackground() {

    }
    
}