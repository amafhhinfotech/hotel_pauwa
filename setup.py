from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in hotel_pauwa/__init__.py
from hotel_pauwa import __version__ as version

setup(
	name="hotel_pauwa",
	version=version,
	description="Hotel Pauwa",
	author="Amafhh Infotech",
	author_email="infotechamafhh@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
