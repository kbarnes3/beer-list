from argparse import ArgumentParser
from os import rename, walk
from os.path import join, splitext

PLACEHOLDER_VARIABLE = 'base-angular-app'
PLACEHOLDER_TITLE = 'Base Angular App'
PLACEHOLDER_OWNER = 'BaseAngularAppAuthors'

EXCLUDED_DIRECTORIES = ['.git', '.idea', 'node_modules']
EXCLUDED_FILES = ['replacer.py']
EXCLUDED_EXTENSIONS = ['.pyc']


def replace(file_path, site_variable, site_title, owner):
    modified = False

    with open(file_path, 'rb') as file_handle:
        contents = file_handle.read()

    if bytearray(PLACEHOLDER_VARIABLE, 'utf-8') in contents:
        contents = contents.replace(bytearray(PLACEHOLDER_VARIABLE, 'utf-8'), bytearray(site_variable, 'utf-8'))
        modified = True

    if bytearray(PLACEHOLDER_OWNER, 'utf-8') in contents:
        contents = contents.replace(bytearray(PLACEHOLDER_OWNER, 'utf-8'), bytearray(owner, 'utf-8'))
        modified = True

    if bytearray(PLACEHOLDER_TITLE, 'utf-8') in contents:
        contents = contents.replace(bytearray(PLACEHOLDER_TITLE, 'utf-8'), bytearray(site_title, 'utf-8'))
        modified = True

    if modified:
        with open(file_path, 'wb') as file_handle:
            file_handle.write(contents)
        print('Updated {0}'.format(file_path))
    else:
        print('No changes to {0}'.format(file_path))


def replace_in_files(site_variable, site_title, owner):
    for root, dirs, files in walk('.'):

        # First, make sure we don't touch anything in excluded directories
        for excluded in EXCLUDED_DIRECTORIES:
            if excluded in dirs:
                dirs.remove(excluded)
                print('Skipping {0}'.format(join(root, excluded)))

        for name in files:
            # Make sure we don't want to skip this file because of its name or extension
            if name in EXCLUDED_FILES:
                print('Skipping {0}'.format(join(root, name)))
                continue
            if splitext(name)[1] in EXCLUDED_EXTENSIONS:
                print('Skipping {0}'.format(join(root, name)))
                continue

            full_path = join(root, name)

            # Find and replace anything in the contents of the file
            replace(full_path, site_variable, site_title, owner)


if __name__ == "__main__":
    print('Enter the name of the site in a form suitable for a variable. This should consist of only lowercase characters and dashes (e.g., my-angular-app)')
    site_variable = input('Site Variable: ')

    print('\nEnter the name of the site in your preferred human-readable form. This can contain mixed case, spaces, symbols, etc. (e.g., My Angular App)')
    site_title = input('Site Title: ')

    print('\nEnter the name of the owner of this site. This name will appear in the copyright information for this site')
    owner = input('Owner: ')

    replace_in_files(site_variable, site_title, owner)

