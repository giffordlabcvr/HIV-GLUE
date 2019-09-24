# HIV-CONVAR

## Description

HIV-CONVAR (**H**uman **I**mmunodeficiency **V**irus -- **CON**straint and **V**artiation)
is a linked dataset and set of analysis scripts for analysing the patterns of constrain 
and variation in HIV virus sequences.

HCV-CONVAR is an open source analysis resource, based on [GLUE](http://tools.glue.cvr.ac.uk),
an open source, data-centric bioinformatics environment specialised for the
analysis of virus sequence data.

[HIV-GLUE](http://hcv.glue.cvr.ac.uk) is the GLUE project for analysing HIV sequence data
generally, and HIV-CONVAR is an extension to HIV-GLUE.

## Installation

You can install HIV-CONVAR on computers running Windows, MacOSX or Linux. 

1. Install GLUE, based on the [GLUE installation instructions](http://tools.glue.cvr.ac.uk/#/installation). 
2. Once GLUE is installed and working, you should download Offline HIV-GLUE and load it in to GLUE.
3. Clone the HIV-CONVAR repository into your `gluetools/projects` directory.
4. Within the `gluetools/projects/HIV-CONVAR` directory, start GLUE and build the HIV-CONVAR extension by issuing the following command in GLUE:
```
Mode path: /
GLUE> run file convarHIVglueExtension.glue
```
5. This should run to completion and produce the `OK` result.

## Usage


## Contributing

## Credits

The code was written by Robert Gifford and Josh Singer.

## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)