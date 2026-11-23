import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhoneNumber } from '../src/utils/validation.js';

test('valid international and local phone numbers pass',()=>{
  for(const phone of ['+971 50 123 4567','+91-98765-43210','9876543210','(555) 123-4567']){
    assert.equal(isValidPhoneNumber(phone),true,phone);
  }
});
test('empty, short, long and invalid numbers fail',()=>{
  for(const phone of ['', '123', 'a'.repeat(10),'0123456789012345678901234567890123','+971<script>']){
    assert.equal(isValidPhoneNumber(phone),false,phone);
  }
});
