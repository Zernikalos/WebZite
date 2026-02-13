 'use client';
 
 import { useEffect } from 'react';
 
 function setActive(el: Element | null, active: boolean) {
   if (!el) return;
   if (active) el.setAttribute('data-active', '');
   else el.removeAttribute('data-active');
 }
 
 function initTabbedContent(root: HTMLElement) {
   const tabbedContents = root.querySelectorAll<HTMLElement>('.tabbedcontent');
   tabbedContents.forEach((tabbed) => {
     const tabsSection = tabbed.querySelector<HTMLElement>('.tabs-section');
     const body = tabbed.querySelector<HTMLElement>('.tabs-section-body');
     if (!tabsSection || !body) return;
 
     const activeBtn =
       tabsSection.querySelector<HTMLButtonElement>('.section-tab[data-active=""]') ??
       tabsSection.querySelector<HTMLButtonElement>('.section-tab');
     if (!activeBtn) return;
 
     const togglableAttr = activeBtn.getAttribute('data-togglable') ?? '';
     const allowed = togglableAttr.split(',').map((s) => s.trim()).filter(Boolean);
 
     tabsSection.querySelectorAll('.section-tab').forEach((btn) => setActive(btn, btn === activeBtn));
 
     // Only toggle direct children blocks in the body
     Array.from(body.children).forEach((child) => {
       const tg = (child as HTMLElement).getAttribute('data-togglable');
       setActive(child, !!tg && allowed.includes(tg));
     });
   });
 }
 
 function initPlatformTabs(root: HTMLElement) {
   const hintedBlocks = root.querySelectorAll<HTMLElement>('[data-platform-hinted]');
   hintedBlocks.forEach((hinted) => {
     const row = hinted.querySelector<HTMLElement>('.platform-bookmarks-row');
     if (!row) return;
 
     const activeBtn =
       row.querySelector<HTMLButtonElement>('.platform-bookmark[data-active=""]') ??
       row.querySelector<HTMLButtonElement>('.platform-bookmark');
     if (!activeBtn) return;
 
     const toggle = activeBtn.getAttribute('data-toggle');
     if (!toggle) return;
 
     row.querySelectorAll('.platform-bookmark').forEach((btn) => setActive(btn, btn === activeBtn));
 
     hinted
       .querySelectorAll<HTMLElement>('.sourceset-dependent-content')
       .forEach((content) => {
         const tg = content.getAttribute('data-togglable');
         setActive(content, tg === toggle);
       });
   });
 }
 
 export default function ApiToggles() {
   useEffect(() => {
     const root = document.querySelector<HTMLElement>('.dokka-container');
     if (!root) return;
 
     // Initialize states (tabs and platform tabs)
     initTabbedContent(root);
     initPlatformTabs(root);
 
     const onClick = (e: MouseEvent) => {
       const target = e.target as HTMLElement | null;
       if (!target) return;
 
       const platformBtn = target.closest<HTMLButtonElement>('.platform-bookmark');
       if (platformBtn) {
         const toggle = platformBtn.getAttribute('data-toggle');
         const hinted = platformBtn.closest<HTMLElement>('[data-platform-hinted]');
         if (!toggle || !hinted) return;
 
         const row = platformBtn.closest<HTMLElement>('.platform-bookmarks-row');
         row?.querySelectorAll('.platform-bookmark').forEach((btn) => setActive(btn, btn === platformBtn));
 
         hinted.querySelectorAll<HTMLElement>('.sourceset-dependent-content').forEach((content) => {
           const tg = content.getAttribute('data-togglable');
           setActive(content, tg === toggle);
         });
 
         e.preventDefault();
         return;
       }
 
       const sectionBtn = target.closest<HTMLButtonElement>('.section-tab');
       if (sectionBtn) {
         const tabbed = sectionBtn.closest<HTMLElement>('.tabbedcontent');
         const tabsSection = tabbed?.querySelector<HTMLElement>('.tabs-section');
         const body = tabbed?.querySelector<HTMLElement>('.tabs-section-body');
         if (!tabbed || !tabsSection || !body) return;
 
         const togglableAttr = sectionBtn.getAttribute('data-togglable') ?? '';
         const allowed = togglableAttr.split(',').map((s) => s.trim()).filter(Boolean);
 
         tabsSection.querySelectorAll('.section-tab').forEach((btn) => setActive(btn, btn === sectionBtn));
 
         Array.from(body.children).forEach((child) => {
           const tg = (child as HTMLElement).getAttribute('data-togglable');
           setActive(child, !!tg && allowed.includes(tg));
         });
 
         e.preventDefault();
       }
     };
 
     root.addEventListener('click', onClick);
     return () => root.removeEventListener('click', onClick);
   }, []);
 
   return null;
 }

