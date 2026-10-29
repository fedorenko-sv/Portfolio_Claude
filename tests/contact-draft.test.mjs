import test from 'node:test';
import assert from 'node:assert/strict';
import { contactDraft, telegramDraftUrl } from '../src/lib/contact-draft.ts';
import { eventPayload } from '../src/lib/analytics.ts';
test('contact drafts accept only known topics and projects',()=>{
 assert.match(contactDraft('training'), /обучение по ИИ/);
 assert.match(contactDraft('speaking'), /мероприятии/);
 assert.match(contactDraft('development','edcrm'), /CRM для образовательных центров/);
 assert.doesNotMatch(contactDraft('https://evil.test','private-message'), /evil|private-message/);
});
test('Telegram draft preserves Unicode without introducing URL parameters',()=>{
 const text='Задача & данные?\nСрок: завтра'; const url=new URL(telegramDraftUrl(text));
 assert.equal(url.origin,'https://t.me'); assert.equal(url.pathname,'/fedorenko3d');
 assert.equal(url.searchParams.get('text'),text); assert.equal([...url.searchParams].length,1);
});
test('conversion events exclude personal content and allow finite context',()=>{
 assert.deepEqual(eventPayload('video_play',{id:'edcrm',topic:'development',placement:'home',message:'secret',source:'website'}),{event:'video_play',id:'edcrm',source:'website',topic:'development',placement:'home'});
 assert.equal(eventPayload('message_sent',{message:'private'}),null);
});
