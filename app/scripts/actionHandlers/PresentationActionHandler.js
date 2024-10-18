"use strict";

class PresentationActionHandler {

    route(action) {

        Log.debug(`Handler processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "App_PageAnimation":
                this.animatePage(action.payload);
                break;

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;
                
            case "App_OverlayAnimation":
                this.openPageOverlay(action.payload);
                break;

            case "Hub_ComponentsButton_OnClick":
                this.ZoomInToSection("components1");
                break;
            
            case "Hub_EventBindingButton_OnClick":
                this.ZoomInToSection("eventBinding1");
                break;

            case "Hub_DispatchActionHandlingButton_OnClick":
                this.ZoomInToSection("dispatchActionHandling1");
                break;

            case "Hub_StoreButton_OnClick":
                this.ZoomInToSection("store1");
                break;

            case "Hub_DataBindingButton_OnClick":
                this.ZoomInToSection("dataBinding1");
                break;

            case "Hub_LoggingButton_OnClick":
                this.ZoomInToSection("logging1");
                break;

            case "Hub_ObservablesButton_OnClick":
                this.ZoomInToSection("observables1");
                break;

            case "Hub_DemoButton_OnClick":
                this.ZoomInToSection("demo");
                break;
            
            default:
                // do nothing

        }
    }

    animatePage(payload) {
        if (payload.inReverse) {
            payload.activePage.content.stepAnimationBack();
        }
        else {
            payload.activePage.content.stepAnimationForward();
        }
    }

    transitionPage(payload) {

        if (payload.inReverse) {
            payload.transitionToPage.content.resetAnimationFinal();
        }
        else {
            payload.transitionToPage.content.resetAnimationInitial();
        }
        
        AnimatorService.pageOutro(payload.transitionFromPage.content, payload.usingTransition, payload.withDuration);
        AnimatorService.transitionBackground(payload.transitionFromPage.background, payload.transitionToPage.background, payload.transitionToPage.backgroundX, payload.transitionToPage.backgroundY, payload.transitionToPage.backgroundTransformer, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionToPage.content, payload.usingTransition, payload.withDuration);
            
        App.activePage = payload.transitionToPage;

    }
    
    openPageOverlay(payload) {
        AnimatorService.transitionPageOverlay(payload.usingAction, payload.page.content, payload.page.overlay, payload.withDuration);
    }

    ZoomInToSection(section) {
        
        App.pages.components1.content.resetAnimationInitial();
        
        AnimatorService.pageOutro(App.activePage.content, PageTransition.ZoomIn, 1);
        AnimatorService.transitionBackground(App.activePage.background, App.pages[section].background, 0, 0, null, PageTransition.ZoomIn, 1);
        AnimatorService.pageIntro(App.pages[section].content, PageTransition.ZoomIn, 1);

        App.activePage = App.pages[section];
    }

    unlockLogic() {
        App.store.appModel["Logic"].observableData.isUnlocked = true;
        App.store.appModel.emitNotifications();
    }

    unlockData() {
        App.store.appModel["Data"].observableData.isUnlocked = true;
        App.store.appModel.emitNotifications();
    }

}
