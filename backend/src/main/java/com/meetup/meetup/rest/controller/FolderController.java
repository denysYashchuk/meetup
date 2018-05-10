package com.meetup.meetup.rest.controller;

import com.meetup.meetup.entity.Folder;
import com.meetup.meetup.service.FolderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@PropertySource("classpath:strings.properties")
@RequestMapping("/api/folders")
public class FolderController {

    private static Logger log = LoggerFactory.getLogger(FolderController.class);

    @Autowired
    private FolderService folderService;

    @GetMapping
    public ResponseEntity<List<Folder>> getAllFolders(){
        log.debug("Trying to get all user folders");

        List<Folder> folders = folderService.getUserFolders();

        log.debug("Send response body folders '{}' and status OK", folders.toString());

        return new ResponseEntity<>(folders, HttpStatus.OK);
    }

    @GetMapping("/{folderId}")
    public ResponseEntity<Folder> getFolderById(@PathVariable int folderId){
        log.debug("Trying to get folder by folderId {}", folderId);

        Folder folder = folderService.getFolder(folderId);

        log.debug("Send response body folder '{}' and status OK", folder.toString());

        return new ResponseEntity<>(folder, HttpStatus.OK);
    }

    @PreAuthorize("@folderPermissionChecker.canCreateFolder(#folder)")
    @PostMapping("/add")
    public ResponseEntity<Folder> addFolder(@Valid @RequestBody Folder folder) {
        log.debug("Trying to save folder {}", folder.toString());

        Folder addedFolder = folderService.addFolder(folder);

        log.debug("Send response body saved folder '{}' and status OK", addedFolder.toString());

        return new ResponseEntity<>(addedFolder, HttpStatus.CREATED);
    }

    @PreAuthorize("@folderPermissionChecker.canUpdateFolder(#folder)")
    @PutMapping
    public ResponseEntity<Folder> updateFolder(@Valid @RequestBody Folder folder) {
        log.debug("Trying to update folder {}", folder.toString());

        Folder updatedFolder = folderService.updateFolder(folder);

        log.debug("Send response body updated folder '{}' and status OK", updatedFolder.toString());

        return new ResponseEntity<>(updatedFolder, HttpStatus.OK);
    }

    @PreAuthorize("@folderPermissionChecker.canDeleteFolder(#folderId)")
    @DeleteMapping ("/{folderId}")
    public ResponseEntity<Folder> deleteFolder(@PathVariable Integer folderId) {
        log.debug("Trying to delete folder by id '{}'", folderId);

        Folder deletedFolder = folderService.deleteFolder(folderId);

        log.debug("Send response body deleted folder '{}' and status OK", deletedFolder.toString());

        return new ResponseEntity<>(deletedFolder, HttpStatus.OK);
    }
}
