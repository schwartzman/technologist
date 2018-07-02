from setuptools import find_packages
from setuptools import setup


setup(
    name='technologist',
    use_scm_version=True,
    setup_requires=['setuptools_scm'],
    author='Anthony Schwartzman',
    author_email='anthony@anthonyschwartzman.com',
    description='Developer overview, past work portfolio, and some tools',
    packages=find_packages(exclude=[
        'node_modules',
        'resources',
        'static',
        'templates'
    ]),
    install_requires=[
        'flask',
        'importlib_resources'
    ],
    extras_require={
        'dev': [
            'livereload',
            'zappa'
        ]
    }
)
