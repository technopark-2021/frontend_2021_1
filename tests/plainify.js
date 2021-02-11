'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({ foo: 'bar', baz: 42 }), { 'foo': 'bar', 'baz': 42 });

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);

    const simple = {
      a: 41,
    }
    
    assert.deepEqual(plainify(simple), simple)

    const empty = {} 

    assert.deepEqual(plainify(empty), empty)

    const nested3 = {
      deep: {
        value1: 3,
        obj: {
          a: 42,
          b: 42,
          c: 42,
        },
        value2: 3,
        nested: {
          nested2: {
            obj1: {
              a: 44,
              b: 44,
            },
            obj2: {
              a: 45,
              b: 45,
            }
          },
          obj: {
            x: 4444,
            y: 4444,
          }
        },
        value3: 3,
      }
    }

    const plain3 = {
      'deep.value1': 3,
      'deep.obj.a': 42,
      'deep.obj.b': 42,
      'deep.obj.c': 42,
      'deep.value2': 3,
      'deep.nested.nested2.obj1.a': 44,
      'deep.nested.nested2.obj1.b': 44,
      'deep.nested.nested2.obj2.a': 45,
      'deep.nested.nested2.obj2.b': 45,
      'deep.nested.obj.x': 4444,
      'deep.nested.obj.y': 4444,
      'deep.value3': 3,
    }

    assert.deepEqual(plainify(nested3), plain3)
	});
  QUnit.test('plainify правильно обрабатывает невалидные данные', function (assert) {
    assert.throws(() => { plainify('helloworld') }, 
      Error('Input value is not an object!')
    )

    assert.throws(() => { plainify(new Date()) }, 
      Error('Input value is not an object!')
    )

    assert.throws(() => { plainify(new Set()) },
      Error('Input value is not an object!')
    )

    assert.throws(() => { plainify(new Array()) },
      Error('Input value is not an object!')
    )

    assert.throws(() => { plainify(null) },
      Error('Input value is not an object!')
    )

    assert.throws(() => { plainify(undefined) },
      Error('Input value is not an object!')
    )
  });
});
